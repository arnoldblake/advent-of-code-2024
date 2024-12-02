export async function readFile(file: string): Promise<string> {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(file);
    return decoder.decode(data);
}