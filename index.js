#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rimraf = require('rimraf');

function usage() {
  console.log(`Temporarily installs a local package with all its dependencies.`);
  console.log(`Usage: ${process.argv[1]} <pkg-json-dir>`);
}

// Grab provided args
const [,, ...args] = process.argv;

if (args.length !== 1) {
  usage();
  process.exit(1);
}

const pkgJsonPath = path.join(process.cwd(), args[0], 'package.json');

if (!fs.existsSync(pkgJsonPath)) {
  console.error('Target directory is missing a package.json file.');
  process.exit(1);
}

const {name, dependencies} = JSON.parse(fs.readFileSync(pkgJsonPath));

let dependenciesString = '';

Object.entries(dependencies).forEach(element => {
  dependenciesString += ' ' + element.join('@');
});

// dependenciesString += ' ' + args[0];

dependenciesString = dependenciesString.trim();

if (dependenciesString.length > 0) {
  const installCmd = `npm install --no-save ${dependenciesString}`;
  execSync(installCmd, {
    stdio: 'inherit',
  });
}

console.log('Linking target directory...');

const modulesPath = path.join(process.cwd(), 'node_modules');
const packageTargetPath = path.join(process.cwd(), 'node_modules', name);
const packageSourcePath = path.join(process.cwd(), args[0]);

if (!fs.existsSync(modulesPath)) {
  fs.mkdirSync(modulesPath);
}

if (fs.existsSync(packageTargetPath)) {
  rimraf.sync(packageTargetPath);
}

fs.symlinkSync(packageSourcePath, packageTargetPath);

console.log('\n\nDone.\nRerun after installing any dependencies or after running \'npm ci\'');
