import { expect, it, describe, test } from "vitest";
import {} from "../src";

describe("dom-attach", () => {
  it.todo("pass", () => {
    expect(true).toBe(true);
  });

  test("use happy-dom in this test file", () => {
    const element = document.createElement("div");
    expect(element).not.toBeNull();
  });
});
