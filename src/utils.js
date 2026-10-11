import { useCallback, useEffect, useState } from "react";
const taka = new Intl.NumberFormat("en-US");

export const formatTk = (amount) => `Tk ${taka.format(amount)}`;

export const useQueryState = (key, allowed, fallback) => {
  const [value, setValue] = useState(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(key);
    return allowed.includes(fromUrl) ? fromUrl : fallback;
  });

  const update = useCallback(
    (next) => {
      setValue(next);
      const url = new URL(window.location.href);
      url.searchParams.set(key, next);
      window.history.replaceState(null, "", url);
    },
    [key]
  );

  return [value, update];
};

export const usePreloadImages = (urls) => {
  useEffect(() => {
    const preload = () =>
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    if (document.readyState === "complete") {
      preload();
      return undefined;
    }
    window.addEventListener("load", preload, { once: true });
    return () => window.removeEventListener("load", preload);
  }, [urls]);
};

export const handleTabKeys = (event, ids, current, select) => {
  const index = ids.indexOf(current);

  const moves = {
    ArrowRight: index + 1,
    ArrowDown: index + 1,
    ArrowLeft: index - 1,
    ArrowUp: index - 1,
    Home: 0,
    End: ids.length - 1,
  };

  if (!(event.key in moves)) return;
  event.preventDefault();

  const nextId = ids[(moves[event.key] + ids.length) % ids.length];
  select(nextId);
  
  const tablist = event.currentTarget.closest('[role="tablist"]');
  tablist?.querySelector(`[data-tab="${nextId}"]`)?.focus();
};
