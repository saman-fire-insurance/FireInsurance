# Damage Declaration Wizard - Implementation Summary

## Overview
The damage declaration page has been implemented with temporary save functionality, toast notifications, and localStorage persistence. The form data persists across page refreshes until explicitly saved or submitted.

## Key Features Implemented

### 1. **Temporary Save Button (ذخیره موقت)**
- Located in the **top-left** of the page (next to the exit button)
- Green button with a save icon
- **Behavior:**
  - Does NOT automatically save on form changes
  - Only saves when user explicitly clicks the button
  - Shows a success toast notification when data is saved
  - Saves data to localStorage (and ready for API integration)
  - Disabled while saving is in progress

### 2. **Data Persistence**
- **localStorage Integration:**
  - Data is stored with key: `"damage-declaration-form-data"`
  - Loads saved data automatically on page mount
  - Persists across page refreshes
  - Only cleared when form is finally submitted via exit dialog

### 3. **Real-time Form State Updates**
- Form changes are tracked in real-time but NOT saved automatically
- The `InsuranceInfoForm` component uses `useEffect` with form.watch() to notify parent of changes
- Parent component (`DamageDeclarationWizard`) updates state but doesn't persist to localStorage until user clicks save

### 4. **Toast Notifications**
- **Success Toast** - When temporary save is successful:
  - Title: "تغییرات با موفقیت ذخیره شد"
  - Description: "اطلاعات شما به صورت موقت ذخیره شد"
  - Duration: 3 seconds
  
- **Error Toast** - If save fails:
  - Title: "خطا در ذخیره‌سازی"
  - Description: "لطفاً دوباره تلاش کنید"

- **Submit Toast** - When form is finally submitted via exit dialog:
  - Message: "فرم با موفقیت ثبت شد"

### 5. **Exit Dialog**
- Clicking the red "خروج" button (top-right) opens a confirmation dialog
- **Yes (بله):** 
  - Submits the form (ready for API call)
  - Clears localStorage
  - Navigates to home page
  - Shows success toast
- **No (خیر):** 
  - Closes dialog without any action
  - Form data remains unchanged

## API Integration Points

The code is ready for API integration. Here are the placeholder locations:

### Temporary Save API
```typescript
// Location: damage-declaration-wizard.tsx, line ~69
// TODO: Replace with actual API call when backend is ready
// await fetch('/api/damage-declaration/save', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(formData),
// });
```

### Final Submit API
```typescript
// Location: damage-declaration-wizard.tsx, line ~91
// TODO: Replace with actual API call for final submission
// await fetch('/api/damage-declaration/submit', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(formData),
// });
```

## User Flow

1. **User Opens Page:**
   - If previously saved data exists, it loads automatically
   - Form fields are populated with saved values

2. **User Fills Form:**
   - Changes are tracked in real-time
   - Data is stored in component state only
   - NO automatic saving occurs

3. **User Clicks "ذخیره موقت":**
   - Current form state is saved to localStorage
   - API call would be made (when implemented)
   - Success toast appears
   - Data persists even after page refresh

4. **User Refreshes Page:**
   - Saved data loads automatically
   - User sees exactly what they entered before

5. **User Clicks "خروج" → "بله":**
   - Final submission API call (when implemented)
   - localStorage is cleared
   - Success toast appears
   - Redirects to home page

## Files Modified

1. **`damage-declaration-wizard.tsx`**
   - Added localStorage persistence
   - Added temporary save button in header
   - Added toast notifications
   - Separated form change tracking from saving

2. **`insurance-info-form.tsx`**
   - Removed internal save button
   - Changed from `onSave` to `onChange` prop
   - Real-time change notification to parent
   - Removed local save state management

## Testing Checklist

- [ ] Fill form without saving, refresh page → Data should be lost
- [ ] Fill form, click "ذخیره موقت" → Toast appears
- [ ] After saving, refresh page → Data persists
- [ ] Click "خروج" → Dialog appears
- [ ] Click "خیر" in dialog → Nothing happens
- [ ] Click "بله" in dialog → Navigates to home, data cleared
- [ ] Check localStorage in DevTools → Data structure is correct

## Next Steps

When backend APIs are ready:
1. Replace the commented-out fetch calls with actual endpoints
2. Add error handling for network failures
3. Add loading states for API calls
4. Consider adding debouncing for better UX
5. Add authentication headers if needed
