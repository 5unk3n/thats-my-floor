---
description: Feature Development Workflow
---

1. **Issue Check**: Confirm the issue details and requirements.
2. **Branch Creation**: Create a new branch for the issue.
   - Base branch: `develop` (Make sure to `git pull origin develop` first)
   - Format: `feat/issue-number-description` (e.g., `feat/16-core-libs`)
3. **Implementation**: Implement the changes.
   - Follow strict vertical slice architecture.
   - Enforce linting and formatting rules.
4. **Commit**: Commit changes using Gitmoji convention.
   - `✨ Feat`, `🐛 Fix`, `📦️ Chore`, etc.
5. **Verification**: Run tests and linting before finishing.
   - `npm run lint`
   - `npm run build`
6. **PR Creation**: Create a Pull Request targeting `develop`.
   - Command: `gh pr create --base develop`
   - **Title**: `[Type] Description` (e.g., `✨ Feat : Add core libraries`)
   - **Body**:
     - **Closes**: `#IssueNumber`
     - **Changes**: Detailed list of changes (files, logic, configurations).
     - **Architecture**: How it fits into the vertical slice architecture.
     - **Verification**: How it was tested (commands run, manual checks).
     - **Screenshots**: (If applicable)
