---
description: Feature Development Workflow
---

1. **Issue Check**: Confirm the issue details and requirements.
2. **Branch Creation**: Create a new branch for the issue.
   - Format: `feat/issue-number-description` (e.g., `feat/16-core-libs`)
3. **Implementation**: Implement the changes.
   - Follow strict vertical slice architecture.
   - Enforce linting and formatting rules.
4. **Commit**: Commit changes using Gitmoji convention.
   - `✨ Feat`, `🐛 Fix`, `📦️ Chore`, etc.
5. **Verification**: Run tests and linting before finishing.
   - `npm run lint`
   - `npm run build` (optional but recommended)
6. **PR Creation**: Create a Pull Request.
   - `gh pr create`
