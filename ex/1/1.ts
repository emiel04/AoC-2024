export async function one() {
  const text = await Deno.readTextFile("./ex/1/input.txt");
  const lines = text.split("\n");

  const leftList: number[] = [];
  const rightList: number[] = [];

  // Split the input into two lists
  for (const line of lines) {
    const [left, right] = line.split("   ").map(Number);
    leftList.push(left);
    rightList.push(right);
  }

  leftList.sort(compareNum);
  rightList.sort(compareNum);

  //Calc total
  let total = 0;

  leftList.forEach((x, i) => {
    const y = rightList[i];
    total += getDiff(x, y);
  });

  return total;
}

function getDiff(x: number, y: number) {
  const x1 = Math.min(x, y);
  const x2 = Math.max(x, y);
  return x2 - x1;
}

function compareNum(a: number, b: number) {
  return a - b;
}
