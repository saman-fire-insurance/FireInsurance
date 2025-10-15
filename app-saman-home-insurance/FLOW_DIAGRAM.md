# Damage Declaration Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DAMAGE DECLARATION WIZARD                        │
└─────────────────────────────────────────────────────────────────────┘

Step 1: Insurance Info (Creates ID)
┌──────────────────────────────────────────────────────────┐
│  URL: /damageDeclaration                                 │
│  ────────────────────────────────────────────────────    │
│                                                           │
│  📋 Insurance Info Form:                                 │
│     • Mobile Number                                      │
│     • National ID                                        │
│     • Insurance Approval Phone (optional)                │
│     • Birth Date                                         │
│                                                           │
│  🔄 API: POST /api/damage-declaration/create             │
│  📦 Response: { id: "abc123" }                           │
│                                                           │
│  ✅ Submit → Navigate to Step 2 with ID                  │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
Step 2: Insurance Policy
┌──────────────────────────────────────────────────────────┐
│  URL: /damageDeclaration/insurancePolicy/abc123          │
│  ────────────────────────────────────────────────────    │
│                                                           │
│  📋 Insurance Policy Form:                               │
│     • Policy Number                                      │
│     • Policy File Upload                                 │
│     • Other Insurance (Yes/No)                           │
│       - Company Name (if yes)                            │
│       - Policy Number (if yes)                           │
│       - Case Number (if yes)                             │
│                                                           │
│  🔄 API: PATCH /api/damage-declaration/abc123/update     │
│                                                           │
│  ⬅️  Previous | Next ➡️                                  │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
Step 3: Accident Details
┌──────────────────────────────────────────────────────────┐
│  URL: /damageDeclaration/accident/abc123                 │
│  ────────────────────────────────────────────────────    │
│                                                           │
│  📋 Accident Form: (TO BE IMPLEMENTED)                   │
│     • Accident Date                                      │
│     • Accident Time                                      │
│     • Accident Location                                  │
│     • Description                                        │
│     • Police Report Number (optional)                    │
│                                                           │
│  🔄 API: PATCH /api/damage-declaration/abc123/update     │
│                                                           │
│  ⬅️  Previous | Next ➡️                                  │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
Step 4: Damaged Items
┌──────────────────────────────────────────────────────────┐
│  URL: /damageDeclaration/cases/abc123                    │
│  ────────────────────────────────────────────────────    │
│                                                           │
│  📋 Damaged Items Form: (TO BE IMPLEMENTED)              │
│     • Item 1:                                            │
│       - Name                                             │
│       - Description                                      │
│       - Estimated Value                                  │
│       - Photos                                           │
│     • [+ Add Item]                                       │
│                                                           │
│  🔄 API: PATCH /api/damage-declaration/abc123/update     │
│                                                           │
│  ⬅️  Previous | Next ➡️                                  │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
Step 5: Beneficiaries
┌──────────────────────────────────────────────────────────┐
│  URL: /damageDeclaration/documents/abc123                │
│  ────────────────────────────────────────────────────    │
│                                                           │
│  📋 Beneficiaries Form: (TO BE IMPLEMENTED)              │
│     • Beneficiary 1:                                     │
│       - Full Name                                        │
│       - National ID                                      │
│       - Relationship                                     │
│       - Phone Number                                     │
│       - Bank Account (optional)                          │
│     • [+ Add Beneficiary]                                │
│                                                           │
│  🔄 API: PATCH /api/damage-declaration/abc123/update     │
│                                                           │
│  ⬅️  Previous | Next ➡️                                  │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
Step 6: Review & Submit
┌──────────────────────────────────────────────────────────┐
│  URL: /damageDeclaration/review/abc123                   │
│  ────────────────────────────────────────────────────    │
│                                                           │
│  📋 Review Summary: (TO BE IMPLEMENTED)                  │
│     ┌─────────────────────────────────────┐             │
│     │ ✅ Insurance Info         [Edit]    │             │
│     ├─────────────────────────────────────┤             │
│     │ ✅ Insurance Policy       [Edit]    │             │
│     ├─────────────────────────────────────┤             │
│     │ ✅ Accident Details       [Edit]    │             │
│     ├─────────────────────────────────────┤             │
│     │ ✅ Damaged Items          [Edit]    │             │
│     ├─────────────────────────────────────┤             │
│     │ ✅ Beneficiaries          [Edit]    │             │
│     └─────────────────────────────────────┘             │
│                                                           │
│  ☑️  I agree to terms and conditions                     │
│                                                           │
│  🔄 API: POST /api/damage-declaration/abc123/submit      │
│                                                           │
│  ⬅️  Previous | 📤 Submit                                │
└──────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ✅ SUCCESS!
            Navigate to success page or home


════════════════════════════════════════════════════════════

                    DATA FLOW

┌────────────────────────────────────────────────────────┐
│  Each Step:                                            │
│  ─────────                                             │
│                                                         │
│  1. Load data from localStorage                        │
│     Key: "damage-declaration-form-data-{id}"           │
│                                                         │
│  2. User fills/edits form                              │
│                                                         │
│  3. On change: Update localStorage                     │
│                                                         │
│  4. Temporary Save button:                             │
│     • Save to localStorage                             │
│     • (Optional) Save to backend API                   │
│     • Show success toast                               │
│                                                         │
│  5. Next button:                                       │
│     • Validate form                                    │
│     • Save to localStorage                             │
│     • (Optional) Update backend API                    │
│     • Navigate to next step                            │
│                                                         │
│  6. Previous button:                                   │
│     • Save current data to localStorage                │
│     • Navigate to previous step                        │
│                                                         │
└────────────────────────────────────────────────────────┘


════════════════════════════════════════════════════════════

                URL STRUCTURE

/damageDeclaration
  └── page.tsx                           (Step 1: Create)
  
  └── insurancePolicy/
      └── [id]/
          └── page.tsx                   (Step 2)
  
  └── accident/
      └── [id]/
          └── page.tsx                   (Step 3)
  
  └── cases/
      └── [id]/
          └── page.tsx                   (Step 4)
  
  └── documents/
      └── [id]/
          └── page.tsx                   (Step 5)
  
  └── review/
      └── [id]/
          └── page.tsx                   (Step 6)
  
  └── components/
      ├── insurance-info-form.tsx        ✅ DONE
      ├── insurance-policy-form.tsx      ✅ DONE
      ├── accident-form.tsx              ⏳ TODO
      ├── damaged-items-form.tsx         ⏳ TODO
      ├── beneficiaries-form.tsx         ⏳ TODO
      ├── review-summary.tsx             ⏳ TODO
      └── verificationIdentityResponse.tsx ✅ DONE


════════════════════════════════════════════════════════════

                NAVIGATION FLOW

Browser URL automatically updates at each step:

Start:        /damageDeclaration
Submit Step 1 → /damageDeclaration/insurancePolicy/abc123
Next          → /damageDeclaration/accident/abc123
Next          → /damageDeclaration/cases/abc123
Next          → /damageDeclaration/documents/abc123
Next          → /damageDeclaration/review/abc123
Submit        → / (home) or success page

✨ Users can use browser back/forward buttons
✨ Users can bookmark or share specific step URLs
✨ Page refreshes maintain progress via localStorage
```
