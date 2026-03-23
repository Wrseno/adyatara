/**
 * Typed helper for accessing NarraLeaf Storable namespaces.
 * The Namespace type is not exported from narraleaf-react, so we
 * define the minimal interface we need here.
 */

export interface GameNamespace {
  set(key: string, value: number | string): void;
  get(key: string): number | string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyStorable = { getNamespace(key: string): any };

export function getGameNamespace(storable: AnyStorable): GameNamespace {
  return storable.getNamespace("game") as GameNamespace;
}

export function addScore(storable: AnyStorable, delta: number): void {
  const ns = getGameNamespace(storable);
  const current =
    typeof ns.get("score") === "number" ? (ns.get("score") as number) : 0;
  ns.set("score", current + delta);
}

export function setEnding(storable: AnyStorable, ending: string): void {
  getGameNamespace(storable).set("ending", ending);
}

/**
 * Returns the list of knowledge IDs that have been unlocked so far
 * in the current session (stored as a JSON-serialised string array).
 */
export function getUnlockedKnowledge(storable: AnyStorable): string[] {
  const ns = getGameNamespace(storable);
  const raw = ns.get("unlockedKnowledge");
  if (typeof raw !== "string" || raw === "") return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Marks a knowledge entry as unlocked for this session.
 * Duplicate IDs are silently ignored.
 * The list is persisted to the storable so the server can
 * later write it to `UserKnowledge` when the session completes.
 */
export function unlockKnowledge(
  storable: AnyStorable,
  knowledgeId: string,
): void {
  const current = getUnlockedKnowledge(storable);
  if (current.includes(knowledgeId)) return;
  getGameNamespace(storable).set(
    "unlockedKnowledge",
    JSON.stringify([...current, knowledgeId]),
  );
}
