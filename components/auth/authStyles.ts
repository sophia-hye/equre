export const authInput =
  "w-full border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";

export const authLabel = "label mb-2 block text-muted";

export const authButton =
  "w-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim disabled:opacity-50";

export function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
