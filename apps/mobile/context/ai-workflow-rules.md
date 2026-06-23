# AI Workflow Rules

## Approach

- Build the AROMA project incrementally using a spec-driven workflow.
- Refer to `context/` files before making architectural decisions or writing code.
- Implement strictly against the specified features — do not add code for speculative, unrequested, or future features.

## Scoping Rules

- Implement one feature unit at a time.
- Prefer small, verifiable changes over large files modifications.
- Do not mix styling changes, database queries, and screen state logic in a single file edit if they can be split.

## When to Split Work

Split an implementation step if it involves:
- Adding both database columns and client-side page layouts.
- Creating multiple unrelated screens or navigators.
- Setting up a new library integration alongside screen layout changes.

If a change cannot be verified locally via Metro in under a few minutes, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent visual themes or business rules. Check `DESIGN.md` and `AGENTS.md`.
- If a details is missing, document it in `progress-tracker.md` under "Open Questions" and ask the user for guidance.

## Protected Files

Do not modify the following unless explicitly instructed:
- Root monorepo configuration files (outside of mobile app scope).
- Third-party packages inside `node_modules`.

## Keeping Docs in Sync

- Update the context files immediately if a design, directory layout, or tech stack decision shifts during development.
- Update `progress-tracker.md` after every completed unit.

## Verification Checklist

1. Verify that the changes compile and run without warning inside the Metro Bundler.
2. Run `npm run type-check` (or typescript validation) to ensure type correctness.
3. Verify that the UI reflects the Hunter Green theme exactly.
