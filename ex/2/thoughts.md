# Day 2: Red-Nosed Reports

The first part of this puzzle was simple; I just made a simple for loop which checks each combination of levels.

The second part was more difficult. I had to make a recursive function that would check each combination of levels. I started off making the function recursive: if the array was incorrect, it would remove the item from the array and try again, but that just kept removing items, when you can only remove one.

After that, I decided to use an attempts counter, which is basically an index, keeping track of how many tries have been made. Then, the program uses this index to create a new array to check with that index removed. It keeps doing that until the specific array is checked with all items removed at least once.

This gave me the correct solution.

The code could be cleaner, like putting the logic for checking if a line is safe into another function, but I won’t use this code anyway.

```ts
import { getLines } from "../helper/helper.ts";

export async function two() {
    const lines = await getLines("./ex/2/input.txt");

    let safeLines = 0;

    lines.forEach((line) => {
        const levels = line.split(" ").map(Number);
        if (isSafe(levels)) {
            safeLines++;
        }
    });
    return safeLines;
}

function isSafe(initialLevels: number[], index: number = 0): boolean {
    if(index >= initialLevels.length) return false;
    let levels = [...initialLevels];
    levels = [...levels.slice(0, index), ...levels.slice(index + 1)];
    const decreasing = isDecreasing(levels[0], levels[1]);
    let prev = levels.shift()!;

    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        if (
            prev === level ||
            decreasing !== isDecreasing(prev, level) ||
            !validDifference(prev, level)
        ) {
            return isSafe(initialLevels, index + 1);
        }

        prev = level;
    }
    return true;
}

function isDecreasing(prev: number, current: number): boolean {
    return prev > current;
}

function validDifference(prev: number, level: number) {
    const diff = Math.abs(prev - level);
    return diff > 0 && diff <= 3;
}
