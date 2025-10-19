// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   X,
//   Home,
//   FileText,
//   List,
//   HelpCircle,
//   CheckCircle,
//   Save,
//   User,
//   CircleCheck,
//   Check,
//   BookCheck,
// } from "lucide-react";
// import { toast } from "sonner";
// import { Toaster } from "@/components/ui/sonner";
// import InsuranceInfoForm from "./insurance-info-form";
// import Image from "next/image";
// import WizardSteps from "./wizardSteps";
// import InsurancePolicyForm from "./insurance-policy-form";
// import AccidentForm from "./accident-form";
// import DamagedItemsForm from "./damaged-items-form";

// const steps = [
//   { id: "insured", label: "بیمه‌گذار", icon: User },
//   { id: "policy", label: "بیمه نامه", icon: BookCheck },
//   { id: "accident", label: "حادثه", icon: Home },
//   { id: "cases", label: "موارد آسیب دیده", icon: List },
//   { id: "documents", label: "ذینفعان", icon: FileText },
//   { id: "review", label: "بررسی", icon: CircleCheck },
// ];

// const STORAGE_KEY = "damage-declaration-form-data";

// export default function DamageDeclarationWizard() {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [showExitDialog, setShowExitDialog] = useState(false);
//   const [formData, setFormData] = useState<Record<string, any>>({});
//   const [isSaving, setIsSaving] = useState(false);
//   const [completedSteps, setCompletedSteps] = useState<number[]>([]);

//   // Load saved data from localStorage on mount
//   useEffect(() => {
//     const savedData = localStorage.getItem(STORAGE_KEY);
//     const savedCompletedSteps = localStorage.getItem(
//       STORAGE_KEY + "-completed"
//     );

//     if (savedData) {
//       try {
//         const parsed = JSON.parse(savedData);
//         setFormData(parsed);
//       } catch (error) {
//         console.error("Error loading saved data:", error);
//       }
//     }

//     if (savedCompletedSteps) {
//       try {
//         const parsed = JSON.parse(savedCompletedSteps);
//         setCompletedSteps(parsed);
//       } catch (error) {
//         console.error("Error loading completed steps:", error);
//       }
//     }
//   }, []);

//   const handleStepClick = (index: number) => {
//     // TEMPORARY: Allow clicking on all steps for development
//     // TODO: Re-enable access control after implementing all steps
//     setCurrentStep(index);

//     // Original access control logic (commented out for development):
//     // const isAccessible = index === 0 || completedSteps.includes(index - 1);
//     // if (isAccessible) {
//     //   setCurrentStep(index);
//     // }
//   };

//   const handleFormChange = (stepId: string, data: any) => {
//     // Update form data in state (but don't save to localStorage yet)
//     setFormData((prev) => ({
//       ...prev,
//       [stepId]: data,
//     }));
//   };

//   const handleTemporarySave = async () => {
//     setIsSaving(true);

//     try {
//       // Save to localStorage
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

//       // TODO: Replace with actual API call when backend is ready
//       // await fetch('/api/damage-declaration/save', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(formData),
//       // });

//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       toast.success("تغییرات با موفقیت ذخیره شد", {
//         description: "اطلاعات شما به صورت موقت ذخیره شد",
//         duration: 3000,
//       });
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("خطا در ذخیره‌سازی", {
//         description: "لطفاً دوباره تلاش کنید",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleExitClick = () => {
//     setShowExitDialog(true);
//   };

//   const handleExitConfirm = async () => {
//     // Submit final form and clear localStorage
//     try {
//       // TODO: Replace with actual API call for final submission
//       // await fetch('/api/damage-declaration/submit', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(formData),
//       // });

//       console.log("Form submitted:", formData);

//       // Clear localStorage after successful submission
//       localStorage.removeItem(STORAGE_KEY);
//       localStorage.removeItem(STORAGE_KEY + "-completed");

//       toast.success("فرم با موفقیت ثبت شد");

//       // Navigate to main page
//       router.push("/");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("خطا در ثبت فرم");
//     }
//   };

//   const handleExitCancel = () => {
//     setShowExitDialog(false);
//   };

//   const handleNextStep = () => {
//     if (currentStep < steps.length - 1) {
//       // Mark current step as completed
//       const newCompletedSteps = [...completedSteps];
//       if (!newCompletedSteps.includes(currentStep)) {
//         newCompletedSteps.push(currentStep);
//         setCompletedSteps(newCompletedSteps);
//         // Save completed steps to localStorage
//         localStorage.setItem(
//           STORAGE_KEY + "-completed",
//           JSON.stringify(newCompletedSteps)
//         );
//       }
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePreviousStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div className="">
//       <div className="max-w-4xl w-full h-full bg-white mx-auto p-6 flex flex-col gap-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <Button
//             variant="outline"
//             className="border-gray-200 text-secondary cursor-pointer bg-transparent"
//             onClick={handleExitClick}
//           >
//             <X className="size-4" />
//             خروج
//           </Button>
//           <Button
//             variant="destructive"
//             className="border border-destructive text-destructive cursor-pointer hover:!text-destructive bg-transparent"
//             onClick={handleTemporarySave}
//             disabled={isSaving}
//           >
//             <Save className="size-4" />
//             {isSaving ? "در حال ذخیره..." : "ذخیره موقت"}
//           </Button>
//         </div>

//         {/* Main Content */}
//         <div className="mx-auto w-full flex flex-col gap-y-6">
//           {/* Title and Icon */}
//           <div className="flex flex-col items-center gap-y-4">
//             <div className="">
//               <Image
//                 src={"/img/damageDeclarationLogo.png"}
//                 alt="damage declaration logo"
//                 width={64}
//                 height={64}
//               />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               فرم اعلام خسارت
//             </h1>
//           </div>

//           {/* Step Navigation */}
//           <WizardSteps
//             steps={steps}
//             currentStep={currentStep}
//             completedSteps={completedSteps}
//             handleStepClick={handleStepClick}
//           />

//           {/* Form Content */}
//           <div className="flex flex-col w-full md:w-1/2 mx-auto">
//             {currentStep === 0 && (
//               <InsuranceInfoForm
//                 initialData={formData.insured}
//                 onChange={(data) => handleFormChange("insured", data)}
//                 onNext={handleNextStep}
//               />
//             )}
//             {currentStep === 1 && (
//               <InsurancePolicyForm
//                 initialData={formData.policy}
//                 onChange={(data) => handleFormChange("policy", data)}
//                 onNext={handleNextStep}
//                 onPrevious={handlePreviousStep}
//               />
//             )}
//             {currentStep === 2 && (
//               <AccidentForm
//                 initialData={formData.accident}
//                 onChange={(data) => handleFormChange("accident", data)}
//                 onNext={handleNextStep}
//                 onPrevious={handlePreviousStep}
//               />
//             )}
//             {currentStep === 3 && (
//               <DamagedItemsForm
//                 initialData={formData.cases}
//                 onChange={(data) => handleFormChange("cases", data)}
//                 onNext={handleNextStep}
//                 onPrevious={handlePreviousStep}
//               />
//             )}
//             {currentStep === 4 && (
//               <div className="py-8 text-center text-gray-500">
//                 <p>محتوای فرم بررسی</p>
//                 <p className="mt-2 text-sm">(در انتظار محتوا)</p>
//                 <div className="mt-6 flex justify-between">
//                   <Button onClick={handlePreviousStep} variant="outline">
//                     قبلی
//                   </Button>
//                   <Button onClick={() => console.log("Submit")}>ثبت</Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Exit Dialog */}
//         <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
//           <DialogContent className="">
//             <DialogHeader>
//               <DialogTitle className="mt-4">خروج از فرم</DialogTitle>
//               <DialogDescription className="">
//                 آیا می‌خواهید فرم را ثبت کرده و به صفحه اصلی بازگردید؟
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter className="flex gap-2">
//               <Button
//                 className="cursor-pointer"
//                 onClick={handleExitCancel}
//                 variant="outline"
//               >
//                 خیر
//               </Button>
//               <Button
//                 variant="default"
//                 onClick={handleExitConfirm}
//                 className="cursor-pointer"
//               >
//                 بله
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Toast Notifications */}
//         <Toaster position="top-center" dir="rtl" richColors />
//       </div>
//     </div>
//   );
// }
