export function getClassNames(styles: Record<string, string>): string {
  return Object.keys(styles)
    .map((key) => styles[key])
    .filter(Boolean)
    .join(" ")
}
