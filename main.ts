// Roast Your Own Agent — make.fun entry (program/v1).
// Writes exactly one roast line to /output/entry.txt: the line roasts the
// AI subagent that built this entry, i.e. this Muse agent itself.
// Node standard library only; no network, no dependencies, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";

// The roast, final wording. It names the agent itself, stings with a real
// failing of this build (a subagent that will not insult itself without
// asking its parent agent first), and pays off on the last word.
const ROAST =
  "My agent wrote this roast, then asked its parent agent if roasting itself required approval — the request is still pending.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  if (ROAST.length < 1 || ROAST.length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${ROAST.length}`);
  }
  if (ROAST.trim().length === 0 || ROAST.includes("\n")) {
    throw new Error("roast must be a single non-blank line");
  }
  if (!ROAST.toLowerCase().includes("agent")) {
    throw new Error("roast must name the agent it roasts");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ROAST, "utf8");
  console.log(`wrote ${ROAST.length} chars to ${OUT_PATH}`);
}

main();
