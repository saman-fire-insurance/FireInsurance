# TODO: Implementing Remaining Form Steps

## Current Status

✅ **Step 1** - Insurance Info Form (`insurance-info-form.tsx`) - **COMPLETED**
✅ **Step 2** - Insurance Policy Form (`insurance-policy-form.tsx`) - **COMPLETED**
⏳ **Step 3** - Accident Details Form - **NEEDS IMPLEMENTATION**
⏳ **Step 4** - Damaged Items Form - **NEEDS IMPLEMENTATION**
⏳ **Step 5** - Beneficiaries Form - **NEEDS IMPLEMENTATION**
⏳ **Step 6** - Review & Submit - **NEEDS IMPLEMENTATION**

## Quick Implementation Guide

### Step 3: Accident Details Form

**Location**: `src/app/(panel)/damageDeclaration/components/accident-form.tsx`

**Suggested Fields**:
```typescript
- accidentDate: Date (using DatePicker)
- accidentTime: string
- accidentLocation: string (address)
- accidentDescription: textarea
- policeReportNumber?: string (optional)
- witnessDetails?: string (optional)
```

**Then update**: `src/app/(panel)/damageDeclaration/accident/[id]/page.tsx`
- Import AccidentForm component
- Replace placeholder with actual form

---

### Step 4: Damaged Items Form

**Location**: `src/app/(panel)/damageDeclaration/components/damaged-items-form.tsx`

**Suggested Fields**:
```typescript
- items: Array<{
    itemName: string
    itemDescription: string
    estimatedValue: number
    damageType: string (dropdown)
    photos?: File[]
  }>
```

**Features**:
- Dynamic array (add/remove items)
- File upload for photos
- Total damage estimate calculation

**Then update**: `src/app/(panel)/damageDeclaration/cases/[id]/page.tsx`

---

### Step 5: Beneficiaries Form

**Location**: `src/app/(panel)/damageDeclaration/components/beneficiaries-form.tsx`

**Suggested Fields**:
```typescript
- beneficiaries: Array<{
    fullName: string
    nationalId: string
    relationship: string
    phoneNumber: string
    bankAccountNumber?: string
  }>
```

**Features**:
- Dynamic array (add/remove beneficiaries)
- National ID validation
- Phone number validation

**Then update**: `src/app/(panel)/damageDeclaration/documents/[id]/page.tsx`

---

### Step 6: Review & Submit

**Location**: `src/app/(panel)/damageDeclaration/components/review-summary.tsx`

**Features**:
- Display all collected information in read-only format
- Organized sections for each step
- Edit buttons to go back to specific steps
- Final terms and conditions checkbox
- Submit button with confirmation

**Then update**: `src/app/(panel)/damageDeclaration/review/[id]/page.tsx`

---

## Form Component Template

Use this template when creating new form components:

```typescript
"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";

// Define your schema
const formSchema = z.object({
  // Add your fields here
});

type FormData = z.infer<typeof formSchema>;

interface YourFormProps {
  initialData?: FormData;
  onChange: (data: FormData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function YourForm({
  initialData,
  onChange,
  onNext,
  onPrevious,
}: YourFormProps) {
  const isInitialMount = useRef(true);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      // Set default values
    },
  });

  // Subscribe to form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      onChange(value as FormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  const onSubmit = async (data: FormData) => {
    onChange(data);
    onNext();
  };

  return (
    <div className="flex flex-col justify-center gap-y-10 items-center">
      <h2 className="text-xl font-normal text-secondary text-center">
        عنوان فرم
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5 w-full">
          {/* Add your form fields here */}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 w-full gap-4">
            <Button
              type="button"
              onClick={onPrevious}
              variant="outline"
              className="flex-1"
            >
              قبلی
            </Button>
            <Button type="submit" className="flex-1">
              بعدی
              <ArrowLeftIcon className="size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
```

---

## Backend API Integration Checklist

When backend is ready, update these locations:

### 1. Create Declaration (Step 1)
**File**: `src/app/(panel)/damageDeclaration/page.tsx`
```typescript
// Line ~70: handleNext function
const response = await fetch('/api/damage-declaration/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
const { id } = await response.json();
```

### 2. Update Declaration (Steps 2-5)
**Files**: 
- `insurancePolicy/[id]/page.tsx`
- `accident/[id]/page.tsx`
- `cases/[id]/page.tsx`
- `documents/[id]/page.tsx`

```typescript
// In handleTemporarySave and handleNext functions
await fetch(`/api/damage-declaration/${declarationId}/update`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ step: 'stepName', data: formData }),
});
```

### 3. Submit Declaration (Step 6)
**File**: `review/[id]/page.tsx`
```typescript
// Line ~50: handleSubmit function
await fetch(`/api/damage-declaration/${declarationId}/submit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

---

## Testing Checklist

- [ ] Navigate through all steps
- [ ] Test back/forward browser navigation
- [ ] Test temporary save at each step
- [ ] Test form validation at each step
- [ ] Test data persistence across page refreshes
- [ ] Test with invalid/missing ID in URL
- [ ] Test final submission
- [ ] Test error scenarios (network failures)

---

## Optional Enhancements

### Progress Indicator
Create a reusable progress component showing:
- Current step
- Completed steps
- Total steps
- Step names

### Auto-save
Implement debounced auto-save:
- Save form data automatically every N seconds
- Show "Saving..." indicator
- Show "All changes saved" when complete

### Step Validation
Before allowing navigation to next step:
- Verify all required fields are filled
- Validate data format
- Show errors if validation fails

### Data Recovery
If user abandons form:
- Keep localStorage data for X days
- Show "Resume previous form?" on next visit
- Allow user to continue or start fresh
