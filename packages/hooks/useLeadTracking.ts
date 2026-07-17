"use client";

import { useEffect } from "react";

const STORAGE_KEY = "cume_lead_tracking";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export type LeadTracking = Partial<Record<(typeof TRACKED_PARAMS)[number], string>>;

// Primeira UTM/gclid/fbclid que o visitante trouxe vale mais que a última —
// por isso só grava se ainda não tiver nada salvo na sessão.
export function useLeadTracking() {
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const tracking: LeadTracking = {};
    for (const key of TRACKED_PARAMS) {
      const value = params.get(key);
      if (value) tracking[key] = value;
    }
    if (Object.keys(tracking).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
    }
  }, []);
}

export function getLeadTracking(): LeadTracking {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadTracking) : {};
  } catch {
    return {};
  }
}
