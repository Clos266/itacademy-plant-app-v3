import { beforeAll, afterAll } from "vitest";

// Test setup to suppress act warnings for simple hook tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes(
        "An update to TestComponent inside a test was not wrapped in act"
      )
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
