"use client";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

type State<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  refreshing: boolean;
};
type Action<T> =
  | { type: "start" }
  | { type: "refresh" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: string };
type Opts<T> = {
  init?: RequestInit;
  retry?: number;
  timeoutMs?: number;
  map?: (x: unknown) => T;
  key?: string;
};

export default function useFetch<T = unknown>(
  url: string | null,
  opts: Opts<T> = {}
) {
  const { init, retry = 0, timeoutMs = 15000, map, key } = opts;

  const [state, dispatch] = useReducer(
    (s: State<T>, a: Action<T>): State<T> => {
      if (a.type === "start")
        return { data: null, error: null, loading: true, refreshing: false };
      if (a.type === "refresh")
        return { ...s, loading: false, refreshing: true, error: null };
      if (a.type === "success")
        return {
          data: a.payload,
          error: null,
          loading: false,
          refreshing: false,
        };
      if (a.type === "error")
        return {
          data: null,
          error: a.payload,
          loading: false,
          refreshing: false,
        };
      return s;
    },
    { data: null, error: null, loading: false, refreshing: false }
  );

  const stableKey = useMemo(
    () => (url ? `${url}${key ? `?k=${key}` : ""}` : null),
    [url, key]
  );

  const optsRef = useRef({ init, retry, timeoutMs, map });
  useEffect(() => {
    optsRef.current = { init, retry, timeoutMs, map };
  }, [init, retry, timeoutMs, map]);

  const load = useCallback(
    async (refresh: boolean) => {
      if (!stableKey) return;
      const { init, retry, timeoutMs, map } = optsRef.current;
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), timeoutMs);
      try {
        if (refresh) {
          dispatch({ type: "refresh" });
        } else {
          dispatch({ type: "start" });
        }
        let attempt = 0;
        let lastErr: Error | null = null;
        while (attempt <= retry) {
          try {
            const res = await fetch(stableKey, { ...init, signal: ctl.signal });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const data = map ? map(json) : json;
            dispatch({ type: "success", payload: data });
            clearTimeout(timer);
            return;
          } catch (e: unknown) {
            lastErr = e as Error;
            attempt += 1;
            if (attempt > retry) break;
            const backoff = Math.min(1000 * 2 ** (attempt - 1), 4000);
            await new Promise((r) => setTimeout(r, backoff));
          }
        }
        dispatch({
          type: "error",
          payload: lastErr?.message || "Request failed",
        });
      } finally {
        clearTimeout(timer);
      }
    },
    [stableKey]
  );

  useEffect(() => {
    load(false);
  }, [stableKey,load]);
  const refetch = useCallback(() => load(true), [load]);

  return { ...state, refetch };
}
