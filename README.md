# create-folder-cli

A simple CLI tool that helps you navigate through directories and create files or folders with ease.

## Features

- Interactive directory selection using arrow keys
- Displays directories and subdirectories with proper indentation
- Starts with a clear root directory indicator
- Visual hierarchy with indentation levels for easier navigation
- Create files or folders in any directory with a single selection
- Choose whether to create a file or folder after selecting a directory
- Colorful UI with helpful messages
- Checks for file/folder existence to prevent accidental overwrites
- Simple, focused workflow with no unnecessary prompts

## Installation

Clone this repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/yourusername/create-folder-cli.git
cd create-folder-cli

# Install dependencies
bun install

# Build the project
bun run build

# Link it globally (optional)
npm link
```

## Usage

Run the CLI tool:

```bash
# If linked globally
create-item

# Or run directly
bun run start
```

Create files or folders in directories:
1. The tool displays a (root) option at the top representing your current directory
2. All subdirectories are listed with proper indentation to show hierarchy
3. Use arrow keys to select a directory
4. Choose whether to create a file or folder
5. Enter a name for your file or folder
6. The tool will create the item in your selected directory and exit
7. Run the command again if you need to create additional items

## Development

```bash
# Build the project
bun run build

# Run the CLI
bun run start
```

## License

MIT
