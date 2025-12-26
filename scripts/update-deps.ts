import { spawnSync } from 'child_process';
import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const TEMPLATES_DIR = join(ROOT, 'default');

function findPackageJsonDirs(dir: string): string[] {
  const results: string[] = [];

  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      const pkgPath = join(fullPath, 'package.json');
      if (existsSync(pkgPath)) {
        results.push(fullPath);
      }
      results.push(...findPackageJsonDirs(fullPath));
    }
  }

  return results;
}

async function main() {
  const dirs = findPackageJsonDirs(TEMPLATES_DIR);

  console.log(`Found ${dirs.length} template(s) with package.json:\n`);
  dirs.forEach((d, i) => {
    const relative = d.replace(ROOT + '/', '');
    console.log(`  ${i + 1}. ${relative}`);
  });
  console.log('');

  for (const dir of dirs) {
    const relative = dir.replace(ROOT + '/', '');
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Updating: ${relative}`);
    console.log(`${'='.repeat(60)}\n`);

    // Run ncu in interactive mode - works directly on package.json
    const result = spawnSync('npx', ['npm-check-updates', '-i'], {
      cwd: dir,
      stdio: 'inherit',
      shell: true
    });

    if (result.status !== 0) {
      console.log(`\nSkipped or cancelled for ${relative}`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
