export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeSortedBy(key: string, options?: { descending: boolean }): R;
    }
  }
}
