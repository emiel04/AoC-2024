import {getLines} from "../helper/helper.ts";

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
