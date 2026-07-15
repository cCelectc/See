/* This is a script to create a new spec page markdown file with front-matter */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filename argument provided
Usage: pnpm new-page -- <name>`);
	process.exit(1);
}

const name = args[0];
const targetDir = path.join("./content/spec", name);

if (fs.existsSync(targetDir)) {
	console.error(`Error: Directory ${targetDir} already exists`);
	process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const content = `---
title: ${name}
description: ''
image: ''
---
`;

const filePath = path.join(targetDir, "index.md");
fs.writeFileSync(filePath, content);

console.log(`Page ${filePath} created`);
