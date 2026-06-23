# Portal Home Tasks

**Design**: `.specs/features/portal-home/design.md`
**Status**: Done

---

## Execution Plan

### Phase 1: Foundation

```txt
T1 -> T2
```

### Phase 2: Home Components

```txt
T2 -> T3
T2 -> T4
T2 -> T5
```

### Phase 3: Routes and Verification

```txt
T3 + T4 + T5 -> T6 -> T7
```

---

## Task Breakdown

### T1: Create portal route structure

**What**: Create the required portal route folders and placeholder route files.
**Where**: `src/app/(modules)/portal`
**Depends on**: None
**Reuses**: Existing App Router module structure.
**Requirement**: PORTAL-HOME-01, PORTAL-HOME-06

**Tools**:

- MCP: filesystem
- Skill: tlc-spec-driven

**Done when**:

- [ ] `/portal/home/page.tsx` exists.
- [ ] `/portal/aulas/page.tsx` exists.
- [ ] `/portal/turmas/page.tsx` exists.
- [ ] `/portal/pendencias/page.tsx` exists.
- [ ] Pages compile without TypeScript errors.

**Tests**: none
**Gate**: `yarn tsc --noEmit`

**Status**: Done

---

### T2: Create portal layout and bottom navigation

**What**: Add portal layout shell with fixed bottom navigation.
**Where**: `src/app/(modules)/portal/layout.tsx`, `src/components/portal/PortalBottomNavigation.tsx`
**Depends on**: T1
**Reuses**: `next/link`, `next/navigation`, Lucide icons, existing Tailwind patterns.
**Requirement**: PORTAL-HOME-05, PORTAL-HOME-07

**Tools**:

- MCP: filesystem
- Skill: tlc-spec-driven

**Done when**:

- [ ] Bottom navigation has Home, Turmas and Aulas.
- [ ] Home item is centered and visually stronger than side items.
- [ ] Active route state is visible.
- [ ] Layout includes safe-area/bottom padding so content is not hidden.
- [ ] Desktop keeps content centered.

**Tests**: none
**Gate**: `yarn tsc --noEmit`

**Status**: Done

---

### T3: Create portal user card

**What**: Build the greeting and user information card using mock user data.
**Where**: `src/components/portal/PortalUserCard.tsx`
**Depends on**: T2
**Reuses**: Lucide user icon, dashboard card visual language.
**Requirement**: PORTAL-HOME-02

**Tools**:

- MCP: filesystem
- Skill: tlc-spec-driven

**Done when**:

- [ ] Component accepts or uses mock user data.
- [ ] It displays greeting, nome, telefone, email and user icon.
- [ ] Card is full width within the mobile container.
- [ ] Card remains readable on mobile and desktop.

**Tests**: none
**Gate**: `yarn tsc --noEmit`

**Status**: Done

---

### T4: Create quick access grid

**What**: Build the Acesso rapido section with touch-friendly quick access cards.
**Where**: `src/components/portal/QuickAccessGrid.tsx`
**Depends on**: T2
**Reuses**: `next/link`, Lucide icons, Tailwind grid utilities.
**Requirement**: PORTAL-HOME-03, PORTAL-HOME-06

**Tools**:

- MCP: filesystem
- Skill: tlc-spec-driven

**Done when**:

- [ ] Section title is `Acesso rapido`.
- [ ] Cards exist for Aulas, Turmas, Calendario, Historico and Pendencias.
- [ ] Mobile layout uses 2 columns.
- [ ] Cards have hover and active states.
- [ ] Links do not create 404 for routes implemented in this slice.

**Tests**: none
**Gate**: `yarn tsc --noEmit`

**Status**: Done

---

### T5: Create portal summary cards

**What**: Build compact responsive summary cards for portal metrics.
**Where**: `src/components/portal/PortalSummaryCards.tsx`
**Depends on**: T2
**Reuses**: Dashboard metric card styling approach.
**Requirement**: PORTAL-HOME-04, PORTAL-HOME-07

**Tools**:

- MCP: filesystem
- Skill: tlc-spec-driven

**Done when**:

- [ ] Cards exist for Aulas hoje, Proximas aulas, Pendencias and Turmas ativas.
- [ ] Cards are compact on mobile.
- [ ] Cards adapt to tablet/desktop without overflow.

**Tests**: none
**Gate**: `yarn tsc --noEmit`

**Status**: Done

---

### T6: Compose portal home and placeholders

**What**: Wire components into `/portal/home` and add placeholder content for navigation routes.
**Where**: `src/app/(modules)/portal/home/page.tsx`, `src/app/(modules)/portal/aulas/page.tsx`, `src/app/(modules)/portal/turmas/page.tsx`, `src/app/(modules)/portal/pendencias/page.tsx`
**Depends on**: T3, T4, T5
**Reuses**: Components from `src/components/portal`.
**Requirement**: PORTAL-HOME-01, PORTAL-HOME-06

**Tools**:

- MCP: filesystem
- Skill: tlc-spec-driven

**Done when**:

- [ ] `/portal/home` renders the full Home with mock data.
- [ ] `/portal/aulas`, `/portal/turmas` and `/portal/pendencias` render `Ola mundo`.
- [ ] No real query/service/API is imported by the portal Home.
- [ ] Navigation between implemented routes works.

**Tests**: none
**Gate**: `yarn tsc --noEmit`

**Status**: Done

---

### T7: Validate responsive behavior

**What**: Verify the portal Home in mobile, tablet and desktop sizes and adjust styling if needed.
**Where**: Portal routes and components created in T1-T6.
**Depends on**: T6
**Reuses**: Existing responsive Tailwind patterns.
**Requirement**: PORTAL-HOME-07

**Tools**:

- MCP: filesystem
- Skill: tlc-spec-driven

**Done when**:

- [ ] Mobile viewport has no horizontal overflow.
- [ ] Bottom navigation does not cover content.
- [ ] Tablet horizontal keeps app-like layout.
- [ ] Desktop content is centered and not over-stretched.
- [ ] Lint focused on portal files passes.

**Tests**: none
**Gate**: `yarn tsc --noEmit` and focused eslint command.

**Status**: Done

**Verification executed**:

```bash
yarn tsc --noEmit
yarn eslint 'src/app/(modules)/portal' src/components/portal
```

Result: both commands passed.

---

## Parallel Execution Map

```txt
Phase 1:
  T1 -> T2

Phase 2:
  T2 complete, then:
    T3
    T4
    T5

Phase 3:
  T3, T4, T5 complete -> T6 -> T7
```

Tasks T3, T4 and T5 can be implemented independently after T2, but should be verified together before T6.

---

## Task Granularity Check

| Task | Scope | Status |
| --- | --- | --- |
| T1 | Route files/folders | OK |
| T2 | Layout/navigation component | OK |
| T3 | One user card component | OK |
| T4 | One quick access component | OK |
| T5 | One summary component | OK |
| T6 | Composition and placeholders | OK |
| T7 | Validation pass | OK |

---

## Diagram-Definition Cross-Check

| Task | Depends On (task body) | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | None | Match |
| T2 | T1 | T1 -> T2 | Match |
| T3 | T2 | T2 -> T3 | Match |
| T4 | T2 | T2 -> T4 | Match |
| T5 | T2 | T2 -> T5 | Match |
| T6 | T3, T4, T5 | T3 + T4 + T5 -> T6 | Match |
| T7 | T6 | T6 -> T7 | Match |

---

## Test Co-location Validation

No `.specs/codebase/TESTING.md` exists yet. Until a project testing matrix is created, this feature uses TypeScript and focused ESLint as gate checks.

| Task | Code Layer Created/Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | App Router pages | Not defined | none + tsc | OK |
| T2 | Layout/client navigation | Not defined | none + tsc | OK |
| T3 | UI component | Not defined | none + tsc | OK |
| T4 | UI component | Not defined | none + tsc | OK |
| T5 | UI component | Not defined | none + tsc | OK |
| T6 | Page composition | Not defined | none + tsc | OK |
| T7 | Validation | Not defined | none + tsc/eslint | OK |

---

## Suggested Commit Sequence

1. `feat(portal): add mobile portal shell`
2. `feat(portal): add portal home mock UI`
3. `feat(portal): add placeholder navigation pages`
