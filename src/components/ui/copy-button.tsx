"use client";

import { useEffect, useState } from "react";

const labels = {
  idle: "Copier l'adresse",
  copied: "Adresse copiée",
  failed: "Copie impossible",
};

export function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState<keyof typeof labels>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2200);
    return () => clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <button type="button" className="btn" onClick={copy}>
      <span aria-live="polite">{labels[status]}</span>
      <i aria-hidden="true">{status === "copied" ? "✓" : "+"}</i>
    </button>
  );
}
