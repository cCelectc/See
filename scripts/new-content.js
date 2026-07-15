import fs from "node:fs";
import path from "node:path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);
const typeIndex = args.indexOf("--type");
if (typeIndex === -1 || typeIndex + 1 >= args.length) {
	console.error(`Error: --type post|page required
Usage: pnpm new-post -- --type post -- <name>
       pnpm new-page -- --type page -- <name>`);
	process.exit(1);
}

const type = args[typeIndex + 1];
const name = args[args.length - 1];

if (!["post", "page"].includes(type)) {
	console.error(`Error: Invalid type "${type}". Must be "post" or "page".`);
	process.exit(1);
}

if (!name || name.startsWith("--")) {
	console.error("Error: No filename argument provided");
	process.exit(1);
}

const targetDir =
	type === "post"
		? path.join("./content/posts", name)
		: path.join("./content/spec", name);

if (fs.existsSync(targetDir)) {
	console.error(`Error: Directory ${targetDir} already exists`);
	process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const frontmatter =
	type === "post"
		? `---
title: ${name}
published: ${getDate()}
updated: ''
description: ''
image: ''
tags: []
category: ''
draft: false
lang: ''
pinned: false
---`
		: `---
title: ${name}
description: ''
image: ''
---`;

const filePath = path.join(targetDir, "index.md");
fs.writeFileSync(filePath, frontmatter);

const label = type === "post" ? "Post" : "Page";
console.log(`${label} ${filePath} created`);
