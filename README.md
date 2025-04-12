# touch-fast

A simple CLI tool that helps you navigate through directories and create files or folders with ease.

Run the CLI tool:

```bash
# Run the command
touch-fast
```

## Features

- Interactive directory selection using arrow keys
- Displays directories and subdirectories with proper indentation
- Starts with a clear root directory indicator
- Visual hierarchy with indentation levels for easier navigation
- Create files or folders in any directory with a single selection
- Intuitive workflow: choose what to create, then where to create it
- Colorful UI with helpful messages
- Checks for file/folder existence to prevent accidental overwrites
- Simple, focused workflow with no unnecessary prompts

## Installation

```bash
# Install globally from npm
npm install -g touch-fast

# Or using yarn
yarn global add touch-fast

# Or using pnpm
pnpm add -g touch-fast
```

## Usage

Run the CLI tool:

```bash
# Run the command
touch-fast
```

Create files or folders in directories:
1. Choose whether you want to create a file or folder
2. The tool displays a (root) option at the top representing your current directory
3. All subdirectories are listed with proper indentation to show hierarchy
4. Use arrow keys to select where you want to create the item
5. Enter a name for your file or folder
6. The tool will create the item in your selected directory and exit
7. Run the command again if you need to create additional items

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/touch-fast.git
cd touch-fast

# Install dependencies
bun install

# Build the project
bun run build

# Run the CLI
bun run start
```

## License

MIT
