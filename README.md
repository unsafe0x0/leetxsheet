# LeetXSheet

A dashboard for managing LeetCode problem sheets with the following core idea:

## Core Idea

- Select a sheet from a predefined list (`public/data/sheets.json`).
- Questions load on the dashboard in a table format.
- Each question row includes:
  - Checkbox to mark completion
  - Title with a direct link to the LeetCode problem
  - Difficulty level
- No subcategories or nested folders.

## Data Files

- **Sheets**: `public/data/sheets.json`
  - Format: `[{ "name": "Sheet Name", "file": "filename.json" }]`
- **Questions**: `public/data/questions/<filename>.json`
  - Each file contains an array of questions:
    ```json
    [
      {
        "id": 1,
        "title": "Two Sum",
        "difficulty": "Easy",
        "url": "https://leetcode.com/problems/two-sum/"
      }
    ]
    ```

# Contributing

We welcome contributions to LeetSheet! You can help by adding new problem sheets or questions for coding interviews.

## How to Contribute Sheets or Questions

1. **Fork the repository** and create a new branch for your changes.
2. **Add or update a sheet**:
   - Sheets are located in the `data/` folder (e.g., `blind75.ts`, `tcs.ts`, `leetcode.ts`).
   - To add a new sheet, create a new file in `data/` following the structure of existing files.
   - To add questions to an existing sheet, append your question object to the array in the relevant file.
   - Each question should have at least:
     - `name`: The problem name
     - `difficulty`: One of `Easy`, `Medium`, or `Hard`
     - `link`: A URL to the problem statement
3. **No comments or extra fields**: Please do not add comments or extra fields unless necessary for all sheets.
4. **Open a Pull Request** with a clear description of your changes.

## Example Question Object

```ts
{
  name: "Two Sum",
  difficulty: "Easy",
  link: "https://leetcode.com/problems/two-sum/"
}
```

Please ensure your contributions adhere to the existing format for consistency. Thank you for helping improve LeetSheet!
