import {getLines} from "../helper/helper.ts";

export async function two() {
    const lines = await getLines("./ex/2/input.txt");

    let safeLines = 0;

    lines.forEach((line) => {
        if(isSafe(line)) {
            safeLines++;
        }
    });

    console.log(`Safe lines: ${safeLines}`);
}

function isSafe(line: string): boolean {
    const levels = line.split(" ").map(Number);
    let prev = levels.shift()!;
    const decreasing = isDecreasing(prev, levels[0]);

    for (const level of levels) {
        if (prev === level) {
            return false;
        }
        if (decreasing !== isDecreasing(prev, level)) {
            return false;
        }
        if(!validDifference(prev, level)){
            return false;
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
    return prev !== level && diff > 0 && diff <= 3;
}
