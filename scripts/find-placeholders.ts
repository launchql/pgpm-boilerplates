import * as fs from "fs";
import * as path from "path";

const PLACEHOLDER_PATTERN = /____([a-zA-Z0-9_]+)____/g;

interface Match {
  placeholder: string;
  type: "filename" | "content";
  file: string;
  line?: number;
  context?: string;
}

interface ResultsByDir {
  [dir: string]: Match[];
}

function isIgnoredPath(filePath: string): boolean {
  const ignored = [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "coverage",
  ];
  return ignored.some((ignore) => filePath.includes(`/${ignore}/`) || filePath.includes(`\\${ignore}\\`));
}

function findPlaceholdersInFile(filePath: string): Match[] {
  const matches: Match[] = [];
  const filename = path.basename(filePath);

  // Check filename
  let match;
  while ((match = PLACEHOLDER_PATTERN.exec(filename)) !== null) {
    matches.push({
      placeholder: match[0],
      type: "filename",
      file: filePath,
    });
  }
  PLACEHOLDER_PATTERN.lastIndex = 0;

  // Check file contents
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      while ((match = PLACEHOLDER_PATTERN.exec(line)) !== null) {
        matches.push({
          placeholder: match[0],
          type: "content",
          file: filePath,
          line: index + 1,
          context: line.trim().substring(0, 80),
        });
      }
      PLACEHOLDER_PATTERN.lastIndex = 0;
    });
  } catch (err) {
    // Skip binary files or files that can't be read
  }

  return matches;
}

function walkDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (isIgnoredPath(filePath)) continue;

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function groupByDirectory(matches: Match[], baseDir: string): ResultsByDir {
  const results: ResultsByDir = {};

  for (const match of matches) {
    const relativeFile = path.relative(baseDir, match.file);
    const dir = path.dirname(relativeFile) || ".";

    if (!results[dir]) {
      results[dir] = [];
    }
    results[dir].push({ ...match, file: relativeFile });
  }

  return results;
}

function printResults(results: ResultsByDir): void {
  const dirs = Object.keys(results).sort();

  if (dirs.length === 0) {
    console.log("No placeholders found.");
    return;
  }

  // Collect unique placeholders
  const allPlaceholders = new Set<string>();
  for (const matches of Object.values(results)) {
    for (const match of matches) {
      allPlaceholders.add(match.placeholder);
    }
  }

  console.log("\n📦 Unique placeholders found:");
  console.log("─".repeat(50));
  for (const placeholder of [...allPlaceholders].sort()) {
    console.log(`  ${placeholder}`);
  }

  console.log("\n📁 Results by directory:");
  console.log("═".repeat(50));

  for (const dir of dirs) {
    const matches = results[dir];
    console.log(`\n📂 ${dir}/`);
    console.log("─".repeat(50));

    for (const match of matches) {
      const filename = path.basename(match.file);
      if (match.type === "filename") {
        console.log(`  📄 [filename] ${filename}`);
        console.log(`     → ${match.placeholder}`);
      } else {
        console.log(`  📄 ${filename}:${match.line}`);
        console.log(`     → ${match.placeholder}`);
        if (match.context) {
          console.log(`     │ ${match.context}`);
        }
      }
    }
  }

  // Summary
  console.log("\n📊 Summary:");
  console.log("─".repeat(50));
  console.log(`  Directories: ${dirs.length}`);
  console.log(`  Total matches: ${Object.values(results).flat().length}`);
  console.log(`  Unique placeholders: ${allPlaceholders.size}`);
}

function main(): void {
  const args = process.argv.slice(2);
  const targetDir = args[0] || process.cwd();
  const resolvedDir = path.resolve(targetDir);

  if (!fs.existsSync(resolvedDir)) {
    console.error(`Error: Directory "${resolvedDir}" does not exist.`);
    process.exit(1);
  }

  if (!fs.statSync(resolvedDir).isDirectory()) {
    console.error(`Error: "${resolvedDir}" is not a directory.`);
    process.exit(1);
  }

  console.log(`🔍 Searching for placeholders in: ${resolvedDir}`);
  console.log(`   Pattern: ____<variable>____`);

  const files = walkDir(resolvedDir);
  const allMatches: Match[] = [];

  for (const file of files) {
    const matches = findPlaceholdersInFile(file);
    allMatches.push(...matches);
  }

  const grouped = groupByDirectory(allMatches, resolvedDir);
  printResults(grouped);
}

main();
