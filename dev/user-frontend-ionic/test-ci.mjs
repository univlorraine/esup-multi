/**
 * Runs the Karma test suite of every Angular project that contains at least one
 * `*.spec.ts` file. Projects without specs are skipped on purpose: Karma's
 * `failOnEmptyTestSuite` defaults to `true`, which makes `ng test` exit with a
 * non-zero code when no test is executed.
 *
 * Usage: npm run test:ci
 */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const workspace = JSON.parse(readFileSync('angular.json', 'utf8'));

function containsSpec(dir) {
  if (!existsSync(dir)) {
    return false;
  }
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules') {
      continue;
    }
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      if (containsSpec(fullPath)) {
        return true;
      }
    } else if (entry.endsWith('.spec.ts')) {
      return true;
    }
  }
  return false;
}

const projectsWithTests = Object.entries(workspace.projects)
  .filter(([, project]) => project.architect?.test ?? project.targets?.test)
  .map(([name, project]) => ({ name, sourceRoot: project.sourceRoot ?? project.root ?? '' }))
  .filter(({ sourceRoot }) => containsSpec(sourceRoot))
  .map(({ name }) => name);

if (projectsWithTests.length === 0) {
  console.log('No project with tests found.');
  process.exit(0);
}

console.log(`Running tests for: ${projectsWithTests.join(', ')}\n`);

let failed = false;
for (const project of projectsWithTests) {
  console.log(`\n>>> ng test ${project}`);
  try {
    execSync(`ng test ${project} --watch=false --browsers=ChromeHeadless`, { stdio: 'inherit' });
  } catch {
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
