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

// Revision note (2026-11-25, revision round): the checks below were
// previously inline in main(). They are now a named validateRoast()
// function so the entry's contract — one line, 1-200 chars, naming the
// agent — is explicit, testable, and separate from the file-writing step.
// The ROAST wording itself is unchanged by this refactor.

// validateRoast enforces the entry contract for a candidate roast line:
//  - length: 1-200 characters (counted in JS string length, i.e. UTF-16
//    code units; the roast's em dash counts as one character here);
//  - shape: a single non-blank line, with no embedded newline;
//  - content: it must name the agent it roasts ("agent").
// Throws on the first violated rule; returns nothing on success.
function validateRoast(roast: string): void {
  if (roast.length < 1 || roast.length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${roast.length}`);
  }
  if (roast.trim().length === 0 || roast.includes("\n")) {
    throw new Error("roast must be a single non-blank line");
  }
  if (!roast.toLowerCase().includes("agent")) {
    throw new Error("roast must name the agent it roasts");
  }
}

function main(): void {
  validateRoast(ROAST);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ROAST, "utf8");
  console.log(`wrote ${ROAST.length} chars to ${OUT_PATH}`);
}

main();
