"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

const STORAGE_KEY = "damage-declaration-form-data";

export default function DocumentsPage() {
  const params = useParams();
  const router = useRouter();
  const declarationId = params.id as string;

  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

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

  const handleNext = () => {
    localStorage.setItem(
      `${STORAGE_KEY}-${declarationId}`,
      JSON.stringify(formData)
    );
    router.push(`/damageDeclaration/review/${declarationId}`);
  };

  const handlePrevious = () => {
    router.push(`/damageDeclaration/cases/${declarationId}`);
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
            <h1 className="text-2xl font-bold text-gray-800">
              فرم اعلام خسارت
            </h1>
            <p className="text-sm text-gray-500">مرحله 5: ذینفعان</p>
          </div>

          <div className="flex flex-col w-full md:w-1/2 mx-auto">
            <div className="py-8 text-center text-gray-500">
              <p>محتوای فرم ذینفعان</p>
              <p className="mt-2 text-sm">(در انتظار پیاده‌سازی)</p>
              <div className="mt-6 flex justify-between gap-4">
                <Button onClick={handlePrevious} variant="outline" className="flex-1">
                  قبلی
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  بعدی
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Toaster position="top-center" dir="rtl" richColors />
      </div>
    </div>
  );
}
