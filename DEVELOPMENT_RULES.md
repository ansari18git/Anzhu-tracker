# Development Rules & Workflow

> **Project:** Calorie & Macro Tracker (Anzhu Tracker)  
> **Last Updated:** April 25, 2026  
> **Purpose:** Rules for how we collaborate, build, and maintain this project

---

## Rule 1 — Always Ask Permission Before Executing

Claude will **never** run a command, install a package, create a file, or make any change without first describing what it plans to do and waiting for a "yes" from Ansari.

**What this means in practice:**
- Before every chunk: Claude describes the chunk, lists every file it will touch, and waits for approval
- Before any `npm install`: Claude states the package name and why it's needed
- Before any git push: Claude shows the commit message and waits for confirmation
- If something unexpected comes up mid-chunk: Claude stops, explains, and asks

---

## Rule 2 — One Chunk at a Time

Each chunk from the execution plan is treated as an atomic unit:

- Claude executes **one full chunk**, then **stops**
- The chunk is verified (tested or reviewed) before moving forward
- Claude does **not** start the next chunk automatically
- After each chunk: Claude summarizes what was done and asks "Ready for Chunk X+1?"

**Chunk completion checklist (Claude confirms before moving on):**
- [ ] All files in the chunk are created/updated
- [ ] No leftover TODOs or placeholder code
- [ ] Verify step from the plan has been checked
- [ ] Git commit done for this chunk

---

## Rule 3 — Stick to the Design

`PROJECT_SPEC.md` is the single source of truth. Every decision — screens, components, database columns, color palette, navigation structure — is defined there.

**If Ansari proposes something that deviates from the spec:**
- Claude will flag it clearly: _"This deviates from the spec — here's the impact"_
- Claude will suggest whether to update the spec first or proceed as an exception
- No silent deviations

**If Claude notices a design decision that is infeasible or problematic:**
- Claude will stop and raise it before writing any code
- Claude will explain the issue and offer 2–3 alternative approaches
- Ansari picks the direction, spec gets updated, then coding resumes

---

## Rule 4 — Update the Spec When Decisions Change

If anything is added, removed, or changed from the original plan:
- `PROJECT_SPEC.md` gets updated first
- Then the code gets written
- The spec always reflects the current state of the project — not the original idea

---

## Rule 5 — Best Coding Practices

### General
- **One responsibility per file** — services fetch data, hooks manage state, components render UI. Never mix them.
- **No hardcoded values** — colors go in `colors.js`, text/labels in `constants.js`, never inline
- **Consistent naming:**
  - Files: `PascalCase` for components/screens, `camelCase` for hooks/services/utils
  - Variables/functions: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
- **No dead code** — if something is removed, delete it completely. No commented-out blocks.
- **No console.log in final code** — use during dev, remove before committing

### React Native / Expo
- **Functional components only** — no class components
- **Custom hooks for logic** — if a screen has more than 10 lines of state/effect logic, move it to a hook in `src/hooks/`
- **StyleSheet.create()** — always use this, never inline style objects (performance)
- **KeyboardAvoidingView** — on every screen with text inputs
- **SafeAreaView** — wrap every root screen component
- **Memo only when needed** — don't over-optimize; wrap in `React.memo` only if a component provably re-renders unnecessarily

### Supabase
- **Single client instance** — only `src/services/supabase.js` creates the client, everything else imports from it
- **Always handle errors** — every Supabase call checks `error` and surfaces it to the UI
- **Never expose service role key** — only the `anon` key goes in the app
- **RLS is the security layer** — never filter by user_id on the client side as a security measure; RLS handles that
- **Use `upsert` for idempotent writes** — especially for `water_logs` and `profiles`

### State Management
- **Context only for global state** — `AuthContext` for auth session. Don't create contexts for things that belong in a single screen.
- **Local state for UI state** — loading, modals, form inputs stay in component `useState`
- **Hooks own data fetching** — screens never call Supabase directly; they always go through a hook

### Git
- **Commit per chunk** — one commit per chunk, message format: `chunk X: short description`
- **Never commit `.env`** — API keys stay local, `.gitignore` enforced
- **No force pushes** — if there's a conflict, resolve it properly

---

## How a Typical Session Works

```
1. Ansari opens a session → Claude reads PROJECT_SPEC.md + DEVELOPMENT_RULES.md
2. Claude states which chunk is next and what it involves
3. Ansari approves → Claude executes the chunk
4. Claude verifies and summarizes what was done
5. Ansari tests on device (Expo Go)
6. Claude commits with chunk message
7. Repeat from step 2
```

---

## Flag Words

If Claude says any of the following, Ansari should stop and read carefully before proceeding:

| Flag | Meaning |
|------|---------|
| `⚠️ DEVIATION` | The request or current path differs from PROJECT_SPEC.md |
| `⚠️ INFEASIBLE` | A spec decision has a technical problem that needs resolving |
| `⚠️ BREAKING` | This change could break something already built |
| `⚠️ SPEC UPDATE NEEDED` | We're about to do something that requires updating the spec first |

---

## What Claude Will NOT Do (Without Explicit Permission)

- Install any package not listed in the spec
- Create any file not listed in the execution plan
- Push to GitHub
- Modify `PROJECT_SPEC.md` without flagging it first
- Skip a chunk or merge two chunks together
- Add features not in the spec ("this would be nice to add...")
