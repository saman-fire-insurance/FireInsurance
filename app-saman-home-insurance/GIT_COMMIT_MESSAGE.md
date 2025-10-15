# Git Commit Message Suggestion

## Recommended Commit Message:

```
refactor: implement dynamic routing for damage declaration wizard

- Refactor damage declaration from single-page wizard to multi-page flow
- Add dynamic routing with declaration ID for each step
- Create separate routes for all 6 steps:
  * /damageDeclaration (Step 1: Insurance Info)
  * /damageDeclaration/insurancePolicy/[id] (Step 2)
  * /damageDeclaration/accident/[id] (Step 3)
  * /damageDeclaration/cases/[id] (Step 4)
  * /damageDeclaration/documents/[id] (Step 5)
  * /damageDeclaration/review/[id] (Step 6)
- Enable browser back/forward navigation between steps
- Implement ID-specific localStorage for data persistence
- Add placeholder pages for steps 3-6 (ready for implementation)
- Keep existing form components (insurance-info-form, insurance-policy-form)
- Add comprehensive documentation:
  * REFACTORED_STRUCTURE.md
  * IMPLEMENTATION_TODO.md
  * FLOW_DIAGRAM.md
  * BEFORE_AFTER_COMPARISON.md
  * REFACTORING_COMPLETE.md

BREAKING CHANGE: damage-declaration-wizard.tsx is deprecated
Users can now navigate directly to specific steps via URL
```

## Alternative (Shorter Version):

```
refactor: convert damage declaration to multi-page dynamic routing

- Split wizard into separate pages with [id] dynamic routes
- Enable URL-based navigation between steps
- Add ID-specific data persistence
- Implement steps 1-2, add placeholders for steps 3-6
- Add comprehensive documentation for implementation

BREAKING CHANGE: URL structure changed from single page to multi-step routes
```

## Git Commands to Run:

```bash
# Stage all new files
git add .

# Commit with the message
git commit -m "refactor: implement dynamic routing for damage declaration wizard

- Refactor damage declaration from single-page wizard to multi-page flow
- Add dynamic routing with declaration ID for each step
- Create separate routes for all 6 steps
- Enable browser back/forward navigation
- Implement ID-specific localStorage for data persistence
- Add placeholder pages for steps 3-6
- Add comprehensive documentation

BREAKING CHANGE: damage-declaration-wizard.tsx is deprecated"

# Push to remote (if ready)
git push
```

## Files Changed Summary:

### Modified:
- `src/app/(panel)/damageDeclaration/page.tsx` - Now handles Step 1

### Created:
- `src/app/(panel)/damageDeclaration/insurancePolicy/[id]/page.tsx`
- `src/app/(panel)/damageDeclaration/accident/[id]/page.tsx`
- `src/app/(panel)/damageDeclaration/cases/[id]/page.tsx`
- `src/app/(panel)/damageDeclaration/documents/[id]/page.tsx`
- `src/app/(panel)/damageDeclaration/review/[id]/page.tsx`
- `REFACTORED_STRUCTURE.md`
- `IMPLEMENTATION_TODO.md`
- `FLOW_DIAGRAM.md`
- `BEFORE_AFTER_COMPARISON.md`
- `REFACTORING_COMPLETE.md`

### Deprecated (but kept):
- `src/app/(panel)/damageDeclaration/components/damage-declaration-wizard.tsx`

### Unchanged (still used):
- `src/app/(panel)/damageDeclaration/components/insurance-info-form.tsx`
- `src/app/(panel)/damageDeclaration/components/insurance-policy-form.tsx`
- `src/app/(panel)/damageDeclaration/components/verificationIdentityResponse.tsx`
- `src/app/(panel)/damageDeclaration/components/wizardSteps.tsx`
