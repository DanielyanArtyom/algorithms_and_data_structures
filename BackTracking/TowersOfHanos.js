function towersOfHanos(n, a, b, c) {
  // O(2 ^n - 1)
  if (n === 0) {
    return null;
  }
  towersOfHanos(n - 1, a, c, b);
  console.log(`${a} -> ${c}`);
  towersOfHanos(n - 1, b, a, c);
}
// towersOfHanos(3, "A", "B", "C");
