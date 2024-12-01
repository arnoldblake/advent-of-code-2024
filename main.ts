async function readFile(file: string): Promise<string> {
    const decoder = new TextDecoder("utf-8");
    const data = await Deno.readFile(file);
    return decoder.decode(data);
}

const data = await readFile("input");
const splitData = data.split("\n");

let a = [],b = [];

for (const row in splitData) {
    let [x, y] = splitData[row].split("   ");
    a.push(parseInt(x));
    b.push(parseInt(y));
}

a.sort((a, b) => a - b);
b.sort((a, b) => a - b);

let c = 0;

for (let i = 0; i < a.length; i++) {
    c += (Math.abs(a[i] - b[i]));
    console.log(a[i] - b[i]);
}

console.log(c);