# LeetXSheet

A dashboard for managing LeetCode problem sheets with the following core idea:

## Core Idea

- Select a sheet from a predefined list (`public/data/sheets.json`).
- Questions load on the dashboard in a table format.
- Each question row includes:
  - Checkbox to mark completion
  - Title with a direct link to the LeetCode problem
  - Difficulty level
  - Acceptance rate
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
        "acceptanceRate": "45.3%",
        "url": "https://leetcode.com/problems/two-sum/"
      }
    ]
    ```
