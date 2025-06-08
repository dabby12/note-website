---
applyTo: "**"
---

Coding standards, domain knowledge, and preferences that AI should follow.
Always code in full blocks, and avoid using inline code.
Use pnpm for package management.
Use JavaScipt for this project.
All Api keys, tokens, and secrets should be stored in a .env file.
When asked to create a github commit message, use the following format:

```
<type>(<scope>): <subject>
<body>
```

Where:

- `<type>`: The type of change that is being made (e.g., feat, fix, chore, docs, style, refactor, perf, test).
- `<scope>`: The scope of the change (e.g., component name, module name).
- `<subject>`: A short description of the change (max 72 characters).
- `<body>`: A longer description of the change, if necessary (max 72 characters per line).
  Use the following commit message types:
- feat: A new feature
- fix: A bug fix
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- build: Changes that affect the build system or external dependencies
- ci: Changes to our CI configuration files and scripts
- revert: Reverts a previous commit
- wip: Work in progress
- release: A new release
- security: A security fix
- merge: A merge commit
- revert: A commit that reverts a previous commit
- upgrade: A commit that upgrades a dependency
- downgrade: A commit that downgrades a dependency
- hotfix: A commit that fixes a critical issue in production
- patch: A commit that fixes a bug in a release
