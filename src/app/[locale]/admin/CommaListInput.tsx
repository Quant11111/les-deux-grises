"use client";

import { useState } from "react";
import styles from "./admin.module.css";

const toList = (s: string): string[] | undefined => {
  const arr = s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  return arr.length ? arr : undefined;
};

/**
 * Comma-separated text input.
 *
 * Keeps the raw typed text in local state so the user can actually type the
 * "," separator (a controlled `value={list.join(", ")}` would strip it on
 * every keystroke), while still propagating the parsed list to the parent.
 */
export default function CommaListInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[] | undefined;
  onChange: (next: string[] | undefined) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState(() => (value ?? []).join(", "));

  return (
    <input
      className={styles.input}
      value={text}
      placeholder={placeholder}
      onChange={(e) => {
        setText(e.target.value);
        onChange(toList(e.target.value));
      }}
    />
  );
}
