export function formatFeedCount(value: number | undefined, label?: string) {
  if (!value || value <= 0) return label;
  if (value > 999) return "999+";
  return value;
}
