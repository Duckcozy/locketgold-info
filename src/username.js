export function normalizeUsername(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  const username = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
  return /^[\p{L}\p{N}._-]{2,64}$/u.test(username) ? username : "";
}
