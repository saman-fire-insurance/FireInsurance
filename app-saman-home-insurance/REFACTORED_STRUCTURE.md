# Damage Declaration - Refactored File Structure

## Overview
The damage declaration wizard has been refactored to use dynamic routing with an ID parameter. Each step now has its own route with the damage declaration ID embedded in the URL.

## New File Structure

```
src/app/(panel)/damageDeclaration/
├── page.tsx                                    # Step 1: Insurance Info (creates ID)
├── insurancePolicy/[id]/page.tsx              # Step 2: Insurance Policy
├── accident/[id]/page.tsx                     # Step 3: Accident Details
├── cases/[id]/page.tsx                        # Step 4: Damaged Items
├── documents/[id]/page.tsx                    # Step 5: Beneficiaries
├── review/[id]/page.tsx                       # Step 6: Review & Submit
└── components/
    ├── insurance-info-form.tsx                # Reusable form component
    ├── insurance-policy-form.tsx              # Reusable form component
    ├── verificationIdentityResponse.tsx       # Verification response component
    └── wizardSteps.tsx                        # Wizard steps component (optional - not used in new structure)
```

## URL Flow

1. **Start**: `/damageDeclaration`
   - User fills out insurance info form
   - On submit, creates a declaration (gets ID from backend)
   - Navigates to: `/damageDeclaration/insurancePolicy/[id]`

2. **Step 2**: `/damageDeclaration/insurancePolicy/[id]`
   - User fills out insurance policy form
   - Navigates to: `/damageDeclaration/accident/[id]`

3. **Step 3**: `/damageDeclaration/accident/[id]`
   - User fills out accident details
   - Navigates to: `/damageDeclaration/cases/[id]`

4. **Step 4**: `/damageDeclaration/cases/[id]`
   - User lists damaged items
   - Navigates to: `/damageDeclaration/documents/[id]`

5. **Step 5**: `/damageDeclaration/documents/[id]`
   - User adds beneficiaries
   - Navigates to: `/damageDeclaration/review/[id]`

6. **Step 6**: `/damageDeclaration/review/[id]`
   - User reviews all information
   - Final submission

## Backend Integration

### Step 1: Create Declaration

In `src/app/(panel)/damageDeclaration/page.tsx`, replace the temporary ID generation:

```typescript
// Current (temporary):
const declarationId = `temp-${Date.now()}`;

// Replace with:
const response = await fetch('/api/damage-declaration/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
const { id } = await response.json();
const declarationId = id;
```

### Subsequent Steps: Update Declaration

In each step page (insurancePolicy, accident, etc.), update the save functionality:

```typescript
// Save/update to backend
await fetch(`/api/damage-declaration/${declarationId}/update`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

### Final Submission

In `src/app/(panel)/damageDeclaration/review/[id]/page.tsx`:

```typescript
await fetch(`/api/damage-declaration/${declarationId}/submit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## Data Storage

Each page stores data in localStorage with the pattern:
- Key: `damage-declaration-form-data-${declarationId}`
- Value: JSON object containing all form data

This allows:
- Temporary saving between steps
- Recovery if user refreshes page
- Data persistence across navigation

## Key Features

### 1. **Individual Step Navigation**
Each step is now a separate page, allowing:
- Direct URL access to specific steps
- Better browser history management
- Easier deep linking

### 2. **Temporary Save**
Each page includes a "ذخیره موقت" (temporary save) button that:
- Saves current form data to localStorage
- Will eventually save to backend API
- Shows success/error toast notifications

### 3. **ID-Based Routing**
The damage declaration ID is:
- Generated when user submits Step 1
- Passed through URL to subsequent steps
- Used for all data operations

### 4. **Form Components Remain Reusable**
The form components (`insurance-info-form.tsx`, `insurance-policy-form.tsx`) are:
- Still reusable
- Accept initialData, onChange, onNext, onPrevious props
- Independent of routing logic

## Migration Notes

### Old vs New Structure

**Old Structure:**
- Single wizard component managing all steps
- Client-side step navigation
- No URL changes between steps

**New Structure:**
- Separate pages for each step
- URL-based navigation with ID
- Each step is independently accessible

### What Was Changed

1. ✅ Created new route folders with `[id]` dynamic segments
2. ✅ Updated main page to handle ID creation
3. ✅ Created individual pages for each step
4. ✅ Maintained existing form components
5. ✅ Updated navigation logic to use router.push with IDs

### What Needs Backend Integration

1. 🔄 Replace temporary ID generation with actual API call
2. 🔄 Implement save/update endpoints for each step
3. 🔄 Implement final submission endpoint
4. 🔄 Add error handling for API failures
5. 🔄 Add loading states for API calls

## Next Steps

1. **Implement backend API endpoints:**
   - `POST /api/damage-declaration/create` - Create new declaration
   - `PATCH /api/damage-declaration/[id]/update` - Update declaration
   - `POST /api/damage-declaration/[id]/submit` - Final submission

2. **Add form components for remaining steps:**
   - Accident details form (step 3)
   - Damaged items form (step 4)
   - Beneficiaries form (step 5)
   - Review component (step 6)

3. **Add validation:**
   - Check if ID exists before allowing access to steps
   - Redirect to step 1 if invalid/expired ID
   - Validate step completion before allowing next step

4. **Optional enhancements:**
   - Add progress indicator component
   - Add breadcrumb navigation
   - Add step validation markers
   - Implement auto-save functionality

## Testing the New Structure

1. Navigate to `/damageDeclaration`
2. Fill out the insurance info form and submit
3. Note the URL changes to `/damageDeclaration/insurancePolicy/temp-[timestamp]`
4. Continue through steps and observe URL changes
5. Use browser back/forward to navigate between steps
6. Test temporary save functionality at each step

## Benefits of New Structure

✅ **Better UX**: Users can bookmark or share specific steps
✅ **Browser Navigation**: Back/forward buttons work naturally
✅ **Cleaner Code**: Each step is isolated and maintainable
✅ **Scalable**: Easy to add new steps or modify existing ones
✅ **SEO Friendly**: Each step has its own URL (if needed)
✅ **Debugging**: Easier to test individual steps in isolation
