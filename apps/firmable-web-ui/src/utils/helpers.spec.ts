import "@testing-library/jest-dom";
import { processRequest } from "./helpers";

describe("processRequest", () => {
  it("Calls Function with process request", () => {
    expect(processRequest).toBeDefined();
  });
});
