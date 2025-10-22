"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Save, User, BookCheck, Home, List, FileText, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import WizardSteps from "../../../components/wizardSteps";
import ReviewForm from "../../../components/review-form";
import Image from "next/image";

const STORAGE_KEY = "damage-declaration-form-data";

const steps = [
  { id: "insured", label: "بیمه‌گذار", icon: User },
  { id: "policy", label: "بیمه نامه", icon: BookCheck },
  { id: "accident", label: "حادثه", icon: Home },
  { id: "cases", label: "موارد آسیب دیده", icon: List },
  { id: "documents", label: "ذینفعان", icon: FileText },
  { id: "review", label: "بررسی", icon: CircleCheck },
];


interface ContentProps {
  declarationId: string;
}

export default function Content({ declarationId }: ContentProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1, 2, 3, 4]); // Steps 1-5 completed
  const currentStep = 5; // This is step 6 (index 5)

  useEffect(() => {
    const savedData = localStorage.getItem(`${STORAGE_KEY}-${declarationId}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, [declarationId]);

  const handleTemporarySave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem(
        `${STORAGE_KEY}-${declarationId}`,
        JSON.stringify(formData)
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("تغییرات با موفقیت ذخیره شد");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("خطا در ذخیره‌سازی");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExit = () => {
    router.push("/");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call for final submission
      // await fetch(`/api/damage-declaration/${declarationId}/submit`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear localStorage after successful submission
      localStorage.removeItem(`${STORAGE_KEY}-${declarationId}`);

      toast.success("فرم با موفقیت ثبت شد");

      // Navigate to success page or main page
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("خطا در ثبت فرم");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    router.push(`/damageDeclaration/documents/${declarationId}`);
  };

  const handleStepClick = (index: number) => {
    const stepRoutes = [
      "/damageDeclaration",
      `/damageDeclaration/insurancePolicy/${declarationId}`,
      `/damageDeclaration/accident/${declarationId}`,
      `/damageDeclaration/cases/${declarationId}`,
      `/damageDeclaration/documents/${declarationId}`,
      `/damageDeclaration/review/${declarationId}`,
    ];
    
    if (stepRoutes[index]) {
      router.push(stepRoutes[index]);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="max-w-4xl w-full h-full bg-white mx-auto p-6 flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="border-gray-200 text-secondary cursor-pointer bg-transparent"
            onClick={handleExit}
          >
            <X className="size-4" />
            خروج
          </Button>
          <Button
            variant="destructive"
            className="border border-destructive text-destructive cursor-pointer hover:!text-destructive bg-transparent"
            onClick={handleTemporarySave}
            disabled={isSaving}
          >
            <Save className="size-4" />
            {isSaving ? "در حال ذخیره..." : "ذخیره موقت"}
          </Button>
        </div>

        <div className="mx-auto w-full flex flex-col gap-y-6">
          <div className="flex flex-col items-center gap-y-4">
            <div className="">
              <Image
                src={"/img/damageDeclarationLogo.png"}
                alt="damage declaration logo"
                width={64}
                height={64}
              />
            </div>
            <h1 className="text-2xl font-bold text-primary">
              فرم اعلام خسارت
            </h1>
          </div>

          {/* Wizard Steps */}
          <WizardSteps
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            handleStepClick={handleStepClick}
          />

          <div className="flex flex-col w-full md:w-1/2 mx-auto">
            <ReviewForm
              formData={formData}
              onSubmit={handleSubmit}
              onPrevious={handlePrevious}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        <Toaster position="top-center" dir="rtl" richColors />
      </div>
    </div>
  );
}
