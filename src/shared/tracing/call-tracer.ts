export class CallTracer {
  private static stack: string[] = [];

  static enter(label: string) {
    this.stack.push(label);
    console.log(`➡️  ${this.stack.join(' -> ')}`);
  }

  static exit() {
    this.stack.pop();
  }

  static reset() {
    this.stack = [];
  }
}
