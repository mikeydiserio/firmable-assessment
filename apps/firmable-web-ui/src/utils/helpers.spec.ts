// helpers.spec.ts// processRequest.spec.ts
// Note: Simple test to validate that vitest is working

import { processRequest } from "./helpers";

describe("processRequest", () => {
  it("Calls Function with process request", () => {
    expect(processRequest).toBeDefined();
  });
});