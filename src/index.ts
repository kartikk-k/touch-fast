#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

// Define the CLI program
const program = new Command();
program
  .name('create-folder-cli')
  .description('Navigate directories and create files or folders')
  .version('1.0.0');

program.parse();

// Interface for directory structure display
interface DirectoryOption {
  name: string;
  value: string;
  indent: number;
}

async function main() {
  try {
    // Get current directory
    const currentDir = process.cwd();
    
    // Initialize the choices array with the root directory
    const dirChoices: DirectoryOption[] = [
      {
        name: chalk.blue(`(root)`),
        value: currentDir,
        indent: 0
      }
    ];
    
    // Get all directories with indentation
    const allDirs = getAllDirectories(currentDir);
    
    if (allDirs.length === 0 && dirChoices.length === 1) {
      console.log(chalk.yellow('No subdirectories found in the current location.'));
    }
    
    // Create the complete choices array with directories
    const allChoices = [...dirChoices, ...allDirs];
    
    // Let user select a directory
    const { selectedDir } = await inquirer.prompt({
      type: 'list',
      name: 'selectedDir',
      message: 'Select a directory:',
      choices: allChoices.map(dir => ({
        name: ' '.repeat(dir.indent * 2) + dir.name,
        value: dir.value
      })),
      loop: false,
      pageSize: 20
    });
    
    // Ask user if they want to create a file or folder
    const { createType } = await inquirer.prompt({
      type: 'list',
      name: 'createType',
      message: 'What would you like to create?',
      choices: [
        { name: 'File', value: 'file' },
        { name: 'Folder', value: 'folder' }
      ]
    });
    
    if (createType === 'file') {
      await promptForFileName(selectedDir);
    } else {
      await promptForFolderName(selectedDir);
    }
    
  } catch (error) {
    console.error(chalk.red('Error:'), error);
  }
}

// Function to get all directories recursively with proper indentation
function getAllDirectories(rootDir: string, level = 0, maxDepth = 3): DirectoryOption[] {
  try {
    const result: DirectoryOption[] = [];
    
    // Get all subdirectories in current directory
    const entries = fs.readdirSync(rootDir, { withFileTypes: true });
    const dirs = entries
      .filter(entry => entry.isDirectory())
      .filter(entry => !entry.name.startsWith('.') && entry.name !== 'node_modules');
    
    // Add each directory to the result with proper indentation
    for (const dir of dirs) {
      const fullPath = path.join(rootDir, dir.name);
      
      result.push({
        name: chalk.blue(`${level === 0 ? '' : '└─'} ${dir.name}`),
        value: fullPath,
        indent: level
      });
      
      // Recursively get subdirectories if not at max depth
      if (level < maxDepth) {
        const subDirs = getAllDirectories(fullPath, level + 1, maxDepth);
        result.push(...subDirs);
      }
    }
    
    return result;
  } catch (error) {
    console.error(chalk.red(`Error reading directory ${rootDir}:`), error);
    return [];
  }
}

async function promptForFileName(targetDir: string) {
  const { fileName } = await inquirer.prompt({
    type: 'input',
    name: 'fileName',
    message: 'Enter the file name:',
    validate: (input: string) => {
      if (!input.trim()) {
        return 'File name cannot be empty';
      }
      return true;
    }
  });
  
  const filePath = path.join(targetDir, fileName);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    const { overwrite } = await inquirer.prompt({
      type: 'confirm',
      name: 'overwrite',
      message: `File ${fileName} already exists. Overwrite?`,
      default: false
    });
    
    if (!overwrite) {
      console.log(chalk.yellow('Operation cancelled.'));
      return;
    }
  }
  
  // Create the file
  const spinner = ora(`Creating file ${chalk.cyan(fileName)}...`).start();
  
  try {
    await fs.writeFile(filePath, '');
    spinner.succeed(chalk.green(`File ${chalk.green(fileName)} created successfully in ${chalk.green(path.relative(process.cwd(), targetDir) || '(root)')}`));
  } catch (error) {
    spinner.fail(`Failed to create file: ${error}`);
  }
}

async function promptForFolderName(targetDir: string) {
  const { folderName } = await inquirer.prompt({
    type: 'input',
    name: 'folderName',
    message: 'Enter the folder name:',
    validate: (input: string) => {
      if (!input.trim()) {
        return 'Folder name cannot be empty';
      }
      return true;
    }
  });
  
  const folderPath = path.join(targetDir, folderName);
  
  // Check if folder already exists
  if (fs.existsSync(folderPath)) {
    const { overwrite } = await inquirer.prompt({
      type: 'confirm',
      name: 'overwrite',
      message: `Folder ${folderName} already exists. Do you want to continue?`,
      default: false
    });
    
    if (!overwrite) {
      console.log(chalk.yellow('Operation cancelled.'));
      return;
    }
  }
  
  // Create the folder
  const spinner = ora(`Creating folder ${chalk.cyan(folderName)}...`).start();
  
  try {
    await fs.ensureDir(folderPath);
    spinner.succeed(chalk.green(`Folder ${chalk.green(folderName)} created successfully in ${chalk.green(path.relative(process.cwd(), targetDir) || '(root)')}`));
  } catch (error) {
    spinner.fail(`Failed to create folder: ${error}`);
  }
}

// Run the main function
main().catch(error => {
  console.error(chalk.red('Unexpected error:'), error);
  process.exit(1);
}); 