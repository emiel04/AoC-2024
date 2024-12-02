import {getLines} from "../helper/helper.ts";

export async function two() {
    const lines = await getLines("./ex/2/input.txt");

    let safeLines = 0;

    lines.forEach((line) => {
        const levels = line.split(" ").map(Number);
        if(isSafe(levels, true)) {
            safeLines++;
        }
    });

    console.log(`Safe lines: ${safeLines}`);
}

function isSafe(levels: number[], allowCorrection: boolean = false): boolean {
    let prev = levels.shift()!;
    const decreasing = isDecreasing(prev, levels[0]);

    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];


        if (
            prev === level ||
            decreasing !== isDecreasing(prev, level) ||
            !validDifference(prev, level)
        ) {
            if(!allowCorrection) return false;
            const arrayWithoutLevel = [...levels.slice(0, i), ...levels.slice(i + 1)];
            console.log(levels, arrayWithoutLevel);

            return isSafe(arrayWithoutLevel);
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
