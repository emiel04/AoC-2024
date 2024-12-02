export async function getLines(path: string): Promise<string[]> {
    const text = await Deno.readTextFile(path);
    return text.split("\n");
}