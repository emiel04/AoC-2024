export async function getLines(path: string): Promise<string[]> {
    const text = await Deno.readTextFile(path);
    return text.split("\n");
}
// deno-lint-ignore no-explicit-any
export async function logResult(func: () => Promise<any>) {
    const startTime = performance.now();
    const res = await func();
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    const logMessage = `${func.name}: ${res} (Execution time: ${duration} ms)\n`;

    console.log(logMessage);
    await Deno.writeTextFile("results.txt", logMessage, { append: true });
}
