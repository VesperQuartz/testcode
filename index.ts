export function fibonacciBigInt(n: number): bigint {
  if (n < 0) throw new Error("Index cannot be negative.");
  if (n === 0) return 0n;
  if (n === 1) return 1n;

  let prev = 0n;
  let current = 1n;

  for (let i = 2; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }

  return current;
}
