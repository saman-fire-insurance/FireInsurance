"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  X,
  Save,
  User,
  BookCheck,
  Home,
  List,
  FileText,
  CircleCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import WizardSteps from "../../../components/wizardSteps";
import Image from "next/image";
import BeneficiariesForm from "../../../components/beneficiaries-form";
import { DamageClaimService } from "@/swagger/services/DamageClaimService";
import { AddStakeHoldersInfoToClaimRequest } from "@/swagger/models/AddStakeHoldersInfoToClaimRequest";
import { StakeHolderItemRequest } from "@/swagger/models/StakeHolderItemRequest";

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
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1, 2, 3]); // Steps 1-4 completed
  const currentStep = 4; // This is step 5 (index 4)

  const handleFormChange = async (data: Record<string, unknown>) => {
    setIsSubmitting(true);
    const requestBody = {
      damageClaimId: declarationId,
      stakeHolders: [
        {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          accountNumber: "",
          iban: "",
          isOwner: true,
        },
      ] as StakeHolderItemRequest,
    } as AddStakeHoldersInfoToClaimRequest;
    console.log(requestBody, "requestBody");
    try {
      const res = await DamageClaimService.postApiV1DamageClaimAddStakeHolders({
        requestBody,
      });
      if (res) {
        setIsSubmitting(false);
        toast.success("اطلاعات ذینفعان با موفقیت ثبت شد");
        router.push(`/damageDeclaration/review/${declarationId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داده است");
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   const savedData = localStorage.getItem(`${STORAGE_KEY}-${declarationId}`);
  //   if (savedData) {
  //     try {
  //       const parsed = JSON.parse(savedData);
  //       setFormData(parsed);
  //     } catch (error) {
  //       console.error("Error loading saved data:", error);
  //     }
  //   }
  // }, [declarationId]);

  const handleTemporarySave = async () => {
    // setIsSaving(true);
    // try {
    //   localStorage.setItem(
    //     `${STORAGE_KEY}-${declarationId}`,
    //     JSON.stringify(formData)
    //   );
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   toast.success("تغییرات با موفقیت ذخیره شد");
    // } catch (error) {
    //   console.error("Error saving data:", error);
    //   toast.error("خطا در ذخیره‌سازی");
    // } finally {
    //   setIsSaving(false);
    // }
  };

  const handleExit = () => {
    router.push("/");
  };

  const handleNext = () => {
    // localStorage.setItem(
    //   `${STORAGE_KEY}-${declarationId}`,
    //   JSON.stringify(formData)
    // );
    // router.push(`/damageDeclaration/review/${declarationId}`);
  };

  const handlePrevious = () => {
    router.push(`/damageDeclaration/cases/${declarationId}`);
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
            <h1 className="text-2xl font-bold text-primary">فرم اعلام خسارت</h1>
          </div>

          {/* Wizard Steps */}
          <WizardSteps
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            handleStepClick={handleStepClick}
          />

          <div className="flex flex-col w-full md:w-1/2 mx-auto">
            <BeneficiariesForm
              initialData={formData.beneficiaries as never}
              onChange={handleFormChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        </div>

        <Toaster position="top-center" dir="rtl" richColors />
      </div>
    </div>
  );
}
