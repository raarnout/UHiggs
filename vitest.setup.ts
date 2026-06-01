// Test setup, loaded before every suite.
//
// Conventions for this library's unit tests:
// - jsdom applies NO Tailwind/CSS, so assert DOM structure, attributes, and
//   className substrings — never computed styles (color/size/visibility).
//   Visual correctness is covered by Storybook + addon-a11y.
// - `scrollHeight` is always 0 under jsdom (no layout engine); stub it per-test
//   with Object.defineProperty when a pixel assertion is genuinely required.
import "@testing-library/jest-dom/vitest";
