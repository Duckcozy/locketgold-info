export function normalizeUsername(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  const profileName = usernameFromProfileUrl(trimmed);
  const candidate = profileName || trimmed;
  const username = candidate.startsWith("@") ? candidate.slice(1) : candidate;
  return /^[\p{L}\p{N}._-]{2,64}$/u.test(username) ? username : "";
}

function usernameFromProfileUrl(value) {
  if (!/^https:\/\//i.test(value)) return "";
  try {
    const url = new URL(value);
    if (!["locket.camera", "www.locket.camera", "locket.cam", "www.locket.cam"].includes(url.hostname.toLowerCase())) return "";
    const fromQuery = url.searchParams.get("username") || url.searchParams.get("user");
    if (fromQuery) return fromQuery.replace(/^@/, "");
    const parts = url.pathname.split("/").filter(Boolean);
    if (!parts.length || parts.some((part) => ["links", "share", "story", "stories"].includes(part.toLowerCase()))) return "";
    const last = decodeURIComponent(parts.at(-1)).replace(/^@/, "");
    return /^[\p{L}\p{N}._-]{2,64}$/u.test(last) ? last : "";
  } catch { return ""; }
}
