# Project TODO Inventory

This document is a detailed inventory of all current `TODO` comments found in the codebase. It expands each comment into a practical implementation task, explains why it matters, identifies likely risks, and suggests an execution order.

## Scope

This list was compiled from the current in-code `TODO` comments present in the project.

## Summary

Total TODO comments found: **7**

### By area
- **Activities**: 1
- **Auth**: 3
- **Navigation / App shell**: 2
- **Networking / HTTP**: 1

### By priority
- **High priority**: 2
- **Medium priority**: 4
- **Low priority**: 1

---

# Recommended Execution Order

## Phase 1 — Stability and correctness
1. Fix the TypeScript issue in `http.ts`
2. Create a reusable back button for auth screens
3. Modularize `RootLayout` styles and screen options

## Phase 2 — UX consistency
4. Bring glassmorphism / mesh-gradient styling to all auth screens
5. Move the activity draft Zustand store into a proper shared store location

## Phase 3 — Architecture improvements
6. Introduce `react-hook-form` for forms across the app
7. Standardize React best practices across all React files

---

# Detailed TODO Breakdown

---

## 1) Move activity draft store into a dedicated store folder

**Source comment:** `TODO: put it in separate store folder`

**File:** `src/features/Activities/hooks/useActivityDraftStore.ts`

## Current state
The draft state for activity creation is implemented with Zustand, but it lives inside a `hooks` folder even though it is not really a hook in the conventional sense. It is a persistent/shared state container.

## Why this matters
- The current placement mixes responsibilities.
- A Zustand store is state infrastructure, not just a view-layer hook.
- As the app grows, it becomes harder to understand where stateful domain logic belongs.
- Better folder structure improves maintainability and onboarding for future contributors.

## Recommended outcome
Move this file into a dedicated store location such as:
- `src/features/Activities/stores/useActivityDraftStore.ts`
- or, if shared between multiple flows, `src/shared/stores/useActivityDraftStore.ts`

## Suggested implementation steps
1. Create a `stores` folder in the appropriate feature or shared area.
2. Move `useActivityDraftStore.ts` into that folder.
3. Update all imports that currently reference the old location.
4. Verify that no circular imports are introduced.
5. If the store is feature-specific, keep it inside the Activities feature. If reused elsewhere, move it to shared.
6. Consider renaming related types for clarity if needed.

## Acceptance criteria
- The store no longer lives in `hooks`.
- All imports compile successfully.
- No runtime behavior changes.
- Folder organization more clearly separates hooks from state stores.

## Priority
**Medium**

## Risks
- Broken imports after file move.
- Inconsistent usage if some files still reference the old path.

## Notes
This is mostly an architectural cleanup task and can be done safely after current feature work.

---

## 2) Create a reusable back button component for auth screens

**Source comment:** `TODO: go back button should be created`

**File:** `src/features/Auth/screens/ForgotPasswordScreen.tsx`

## Current state
The forgot password screen uses an inline `TouchableOpacity` with an `ArrowLeft` icon and inline styling to handle back navigation.

## Why this matters
- Inline implementation is harder to reuse.
- Auth screens will likely need consistent top navigation behavior.
- Reusable navigation controls reduce visual drift and duplicated code.
- This is especially useful if register, forgot password, reset password, and future auth flows need the same back button.

## Recommended outcome
Create a reusable auth back button component, for example:
- `src/features/Auth/components/AuthBackButton.tsx`
- or `src/shared/components/BackButton.tsx` if intended for app-wide use

## Suggested implementation details
The component should support:
- default back behavior via `router.back()`
- optional custom `onPress`
- consistent placement and spacing
- optional variant support if needed later
- accessibility label
- optional hit slop

## Suggested implementation steps
1. Extract the button UI into a reusable component.
2. Move inline styling into a dedicated styles file or local `StyleSheet`.
3. Replace the inline button in `ForgotPasswordScreen`.
4. Review `RegisterScreen`, `ResetPasswordScreen`, and any other auth screens for reuse opportunities.
5. Ensure it does not clash with safe-area padding or screen scroll layout.
6. Add a test ID if your testing approach depends on it.

## Acceptance criteria
- No auth screen uses a one-off inline back button where the shared component should be used.
- Visual placement is consistent across auth screens.
- Back behavior works correctly.
- Accessibility and touch target are reasonable.

## Priority
**High**

## Risks
- Positioning issues if different auth screens have different layouts.
- Duplicate navigation controls if some screens already have headers.

## Notes
This is both a code quality and design consistency improvement.

---

## 3) Apply the new glassy auth style across all auth screens

**Source comment:** `TODO: glassy vibes same as our app in all auth screens.`

**File:** `src/features/Auth/screens/LoginScreen.tsx`

## Current state
The tab screens and dashboard are moving toward a 2026-style aesthetic with mesh gradients and frosted glass cards, but auth screens still use the older styling pattern.

## Why this matters
- The app currently has inconsistent visual identity between auth flows and in-app screens.
- The login screen is the first impression of the app.
- Strong visual continuity makes the product feel more polished and intentional.

## Recommended outcome
Bring all auth screens into the same visual system:
- mesh-gradient or equivalent soft ambient background
- translucent/frosted cards
- subtle borders instead of elevation
- light theme with dark status bar
- consistent spacing, corner radii, inputs, and action buttons

## Screens likely included
- `LoginScreen`
- `RegisterScreen`
- `ForgotPasswordScreen`
- `ResetPasswordScreen`

## Suggested implementation steps
1. Reuse the same background abstraction used elsewhere, or create an auth-specific background wrapper.
2. Update auth containers to use transparent backgrounds where appropriate.
3. Convert main form containers to glass cards.
4. Align input styling with the app’s modern visual system.
5. Use subtle borders instead of drop shadows if that is now the design rule.
6. Keep text contrast readable over gradient backgrounds.
7. Ensure keyboard handling still works properly with the new layout.

## Design considerations
- Do not overuse transparency on form inputs if it hurts readability.
- Primary CTA buttons should still clearly stand out.
- Avoid making auth screens feel too decorative at the cost of usability.

## Acceptance criteria
- All auth screens visually match the current app design language.
- Form readability remains strong.
- Keyboard behavior, scrolling, and spacing still work properly.
- Status bar appearance matches the light UI.

## Priority
**Medium**

## Risks
- Readability issues on translucent backgrounds.
- Layout regressions on smaller devices.
- Input focus states becoming unclear.

## Notes
This should ideally be done together across all auth screens, not one-by-one, to preserve consistency.

---

## 4) Introduce `react-hook-form` for forms across the app

**Source comment:** `TODO: use react hook form for all forms in the app`

**File:** `src/features/Auth/screens/RegisterScreen.tsx`

## Current state
Forms appear to rely on per-field local state and custom hooks. This works, but it may become repetitive and harder to scale across multiple screens.

## Why this matters
- Form validation logic becomes duplicated.
- Managing touched state, errors, and submission state manually is harder over time.
- `react-hook-form` improves performance and structure for larger forms.
- It can standardize validation, reset behavior, and submission handling across the app.

## Scope candidates
Likely screens/forms include:
- Login
- Register
- Forgot password
- Reset password
- Add beneficiary
- Add activity
- Possibly profile or survey forms in the future

## Recommended outcome
Adopt `react-hook-form` gradually with a reusable form pattern.

## Suggested rollout strategy
### Step 1 — Define form conventions
- Decide validation approach:
  - inline validation rules
  - schema validation using `zod` or `yup`
- Define common field wrappers and error rendering approach.

### Step 2 — Start with auth screens
- Migrate `LoginScreen`
- Migrate `RegisterScreen`
- Migrate `ForgotPasswordScreen`
- Migrate `ResetPasswordScreen`

### Step 3 — Migrate main feature forms
- `AddBeneficiaryScreen`
- `AddActivityScreen`
- any other editable forms

### Step 4 — Standardize reusable inputs
Create reusable controlled inputs for:
- text fields
- password fields
- role selector
- date picker integration
- dropdown/select-like inputs

## Suggested implementation details
- Use `Controller` for React Native inputs.
- Keep mutation logic separate from form logic.
- Surface field-level errors near inputs.
- Centralize validation messages where practical.
- Reuse submission button loading states.

## Acceptance criteria
- Major forms use `react-hook-form`.
- Validation logic is more consistent and easier to maintain.
- Form submission and reset behavior is standardized.
- Boilerplate state management is reduced.

## Priority
**Medium**

## Risks
- Large migration if attempted all at once.
- Integration complexity with custom input components.
- Potential regressions in form UX if validation timing is not chosen carefully.

## Notes
Do this incrementally. Start with auth forms, then expand feature by feature.

---

## 5) Modularize styles in `RootLayout`

**Source comment:** `TODO: modularize the styles here also`

**File:** `src/shared/navigation/routes/RootLayout.tsx`

## Current state
`RootLayout.tsx` contains inline style objects and screen option objects directly in the route configuration.

## Why this matters
- Inline objects increase noise in a central app-shell file.
- Repeated header option definitions are harder to maintain.
- Route configuration becomes less readable as the app grows.
- Shared options can be extracted and reused.

## Recommended outcome
Refactor `RootLayout.tsx` so it focuses on structure and navigation wiring, while styles and repeated options are extracted.

## Suggested extraction candidates
### Styles
- `GestureHandlerRootView` root style
- `FlashMessage` bottom margin handling if it can be wrapped
- any other inline layout objects

### Shared screen option objects
Repeated stack screen options for:
- `Add Beneficiary`
- `Add Activity`
- `Activity Details`
- `Pick Location`
- `Volunteers`
- `Field Surveys`

These share common values such as:
- `headerShown: true`
- white header background
- blue tint
- title text styling

## Possible target structure
- `src/shared/navigation/styles/rootLayoutStyles.ts`
- `src/shared/navigation/constants/headerOptions.ts`
- or a local sibling file near `RootLayout.tsx`

## Suggested implementation steps
1. Extract repeated header style tokens into a shared constant.
2. Extract inline style objects into a `StyleSheet`.
3. Keep only route declarations and imports inside `RootLayout.tsx`.
4. Optionally create helper functions if some headers differ only by title.
5. Ensure safe area and flash message spacing still behave correctly.

## Acceptance criteria
- `RootLayout.tsx` is visually cleaner and more declarative.
- Shared header styles are defined in one place.
- No behavior changes to navigation.
- Future screen additions can reuse shared header options.

## Priority
**Medium**

## Risks
- Minimal; mostly refactor-related.
- Potentially easy to introduce title mismatches if helper config is over-abstracted.

## Notes
This is a good cleanup task after current feature work stabilizes.

---

## 6) Make React files follow better React best practices

**Source comment:** `TODO: make all react files follow react best practices.`

**File:** `src/shared/navigation/routes/TabLayout.tsx`

## Current state
The comment is broad and project-wide. It likely reflects concerns around consistency, inline object creation, component organization, import hygiene, and general React patterns.

## Why this matters
- Broad inconsistencies increase maintenance cost.
- Inline objects/functions can reduce readability and sometimes affect render behavior.
- Unused imports and mixed styling patterns make code harder to review.
- Standardized patterns help the app scale cleanly.

## Recommended interpretation
Turn this vague TODO into a defined checklist rather than leaving it as an open-ended statement.

## Suggested best-practice checklist
### Component structure
- Keep components focused and single-purpose.
- Extract repeated UI into reusable components.
- Avoid giant screen components where possible.

### Imports
- Remove unused imports.
- Keep import groups consistent:
  - React / framework
  - third-party
  - app aliases / shared
  - local files

### Inline objects and functions
- Reduce unnecessary inline style objects where clarity improves.
- Memoize derived objects where appropriate.
- Avoid premature optimization, but clean obvious cases.

### Naming and typing
- Use clear prop and type names.
- Prefer explicit types for shared abstractions.
- Avoid `any` unless absolutely necessary.

### Hooks and state
- Keep hooks at the top level.
- Move reusable logic into hooks.
- Keep stores, hooks, and presentational components clearly separated.

### Styling
- Prefer `StyleSheet` or centralized style modules for repeatable styles.
- Align with the chosen design system.

### Navigation config
- Extract repeated options and config.
- Avoid burying too much logic inside JSX props when helper constants improve readability.

## Suggested implementation approach
1. Convert this vague TODO into a tracked technical debt checklist.
2. Apply fixes in small batches by feature area.
3. Start with shared/navigation and shared/components.
4. Then move to auth and feature screens.

## Acceptance criteria
- Project follows a consistent file and component structure.
- Unused imports and obvious anti-patterns are cleaned up.
- Repeated UI/configuration is extracted appropriately.
- Broad TODO can be removed and replaced by completed concrete tasks.

## Priority
**Low** as written, but parts of it may become **Medium** when split into concrete items.

## Risks
- Too broad to complete in one pass.
- Risk of endless refactor without shipping value.
- Should not be tackled as a vague app-wide rewrite.

## Notes
This TODO should be converted into smaller actionable tasks instead of being implemented as one large goal.

---

## 7) Fix the TypeScript issue in the Axios request interceptor

**Source comment:** `TODO: solve this typescript error.`

**File:** `src/shared/utils/http.ts`

## Current state
The request interceptor assigns to `config.headers` directly when a token exists:
- this likely triggers a TypeScript mismatch between Axios header types and the assigned object shape

## Why this matters
- This is a real correctness/tooling issue, not just cosmetic debt.
- HTTP utilities are shared infrastructure.
- Ignoring type errors here can hide bugs in auth and request handling.

## Likely root cause
Axios types around `config.headers` can be stricter than a plain object assignment, especially depending on version and whether `AxiosHeaders` is expected.

## Recommended outcome
Update the interceptor so it mutates/assigns headers in a type-safe way consistent with the installed Axios version.

## Potential approaches
### Option A — Safe merge if header object is already plain-compatible
Use an approach compatible with the current config type and header shape.

### Option B — Use Axios header helpers
If Axios exposes header utility methods for the current version, prefer them.

### Option C — Narrow the config/header type
If needed, define a helper that safely normalizes headers before assignment.

## Suggested implementation steps
1. Confirm the exact TypeScript error message.
2. Inspect installed Axios version and corresponding type definitions.
3. Update interceptor logic to use the recommended typed approach.
4. Ensure both request and retry flows assign authorization headers consistently.
5. Run type-checking after the change.

## Related code areas to verify
- request interceptor token injection
- retry request header reassignment after refresh
- any custom request config typing

## Acceptance criteria
- No TypeScript error remains in `http.ts`.
- Authorization headers are still attached correctly.
- Token refresh retry path still works.
- No `any`-based workaround unless absolutely necessary.

## Priority
**High**

## Risks
- Incorrect typing workaround could hide future issues.
- A bad fix could break authenticated requests.

## Notes
This is the most important technical TODO because it affects shared network behavior and code correctness.

---

# Priority Matrix

## High priority
### 1. Fix TypeScript error in `src/shared/utils/http.ts`
Reason: shared infrastructure, correctness, auth-related.

### 2. Create reusable back button for auth screens
Reason: immediate cleanup, reusable UI, consistency across screens.

## Medium priority
### 3. Apply glassy auth styling across auth screens
Reason: product polish and visual consistency.

### 4. Introduce `react-hook-form` across forms
Reason: long-term maintainability and form quality.

### 5. Modularize `RootLayout`
Reason: app-shell maintainability.

### 6. Move activity draft store into proper store folder
Reason: architecture cleanup and clearer code organization.

## Low priority
### 7. Broad React best-practices refactor
Reason: valuable, but too vague to tackle without splitting into concrete tasks.

---

# Suggested Work Breakdown Structure

## Track A — UI consistency
- Reusable auth back button
- Glassy auth screens
- Shared auth layout wrappers if needed

## Track B — Architecture
- Move Zustand draft store
- Modularize `RootLayout`
- Split broad React best-practice cleanup into concrete tickets

## Track C — Form modernization
- Introduce `react-hook-form`
- Build reusable controlled input abstractions
- Migrate forms incrementally

## Track D — Platform stability
- Fix Axios TypeScript header typing issue

---

# Concrete Ticket Suggestions

## Ticket 1
**Title:** Fix Axios interceptor header typing in shared HTTP client

## Ticket 2
**Title:** Create reusable auth back button component and adopt across auth screens

## Ticket 3
**Title:** Apply mesh-gradient glassmorphism design system to auth screens

## Ticket 4
**Title:** Migrate auth forms to `react-hook-form`

## Ticket 5
**Title:** Move activity draft Zustand store into feature store directory

## Ticket 6
**Title:** Extract shared stack header options and styles from `RootLayout`

## Ticket 7
**Title:** Define and execute a React best-practices cleanup checklist

---

# Final Notes

A few of these TODOs are tightly related and should ideally be grouped:

- The auth back button, auth styling refresh, and `react-hook-form` migration naturally belong to one broader **auth cleanup and modernization** effort.
- The `RootLayout` modularization and React best-practice cleanup belong to a **navigation/app-shell cleanup** effort.
- The `http.ts` typing fix should be handled independently and earlier because it affects shared request infrastructure.

If you want, the next best step after this file would be to convert this inventory into:
- a **checkbox checklist**
- a **priority-based sprint plan**
- or a **task board format** with status, owner, and effort estimates.