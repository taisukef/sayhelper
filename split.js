import { readLines } from "https://deno.land/std/io/mod.ts";

const outpath = "sound/";
await Deno.mkdir(outpath, { recursive: true });

const say = async (s, outfn) => {
  const p = Deno.run({ cmd: ["say", "-o", outfn], stdin: "piped" });
  const writer = p.stdin;
  await writer.write(new TextEncoder().encode(s));
  writer.close();
  const status = await p.status();
  console.log(status);
};

let n = 1;
let ss = [];
for await (const line of readLines(Deno.stdin)) {
  console.log(line);
  if (line.length === 0) {
    await say(ss.join("\n"), outpath + n + ".aac");
    n++;
    ss = [];
  } else {
    ss.push(line);
  }
}
