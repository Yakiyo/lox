import { Scanner } from "./scanner.ts";

const errs: Error[] = [];

export function error(line: number, err: string): void {
  errs.push(new Error(`${err} (line: ${line})`));
}

function run(content: string) {
  const scanner = new Scanner(content);
  const tokens = scanner.scanTokens();
  for (const token of tokens) {
    console.log(token);
  }
}

function runFile(file: string) {
  const content = Deno.readTextFileSync(file);
  run(content);
}

function runPrompt() {}

function main() {
  const args = Deno.args;
  if (args.length < 1) {
    runPrompt();
  } else if (args.length == 1) {
    runFile(args[0]);
  } else {
    console.error("Usage: lox [script]");
    Deno.exit(64);
  }
}

main();
