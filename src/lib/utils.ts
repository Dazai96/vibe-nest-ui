import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Create a safe filename by replacing unsafe characters with dashes
 */
export function toSafeFilename(filename: string, extension: string = ""): string {
  const base = filename
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_\.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-\.]+|[-\.]+$/g, "");
  const ext = extension ? (extension.startsWith(".") ? extension : `.${extension}`) : "";
  return `${base || "download"}${ext}`;
}

/**
 * Trigger a browser download for a given Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/**
 * Download plain text content as a file
 */
export function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, filename);
}