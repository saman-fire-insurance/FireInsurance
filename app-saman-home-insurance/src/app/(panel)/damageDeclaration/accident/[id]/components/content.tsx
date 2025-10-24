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
import AccidentForm from "../../../components/accident-form";
import WizardSteps from "../../../components/wizardSteps";
import Image from "next/image";
import { GridifyQuery } from "@/swagger/models/GridifyQuery";
import {
  GetAccidentType,
  GetCities,
  GetOwnerships,
  GetProvinces,
} from "@/swr/accident";
import { GetCitiesRequest } from "@/swagger/models/GetCitiesRequest";
import _ from "lodash";
import { DamageClaimService } from "@/swagger/services/DamageClaimService";
import { AddIncidentInfoToClaimRequest } from "@/swagger/models/AddIncidentInfoToClaimRequest";

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
  const [completedSteps, setCompletedSteps] = useState<number[]>([0, 1]); // Steps 1 & 2 completed
  const currentStep = 2; // This is step 3 (index 2)
  const [provinceId, setProvinceId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestBody = {
    page: 1,
    pageSize: 100,
  } as GridifyQuery;

  const cityRequestBody = {
    provinceId: provinceId,
    query: {
      page: 1,
      pageSize: 100,
    } as GridifyQuery,
  } as GetCitiesRequest;

  const ProvinceRequestBody = {
    page: 1,
    pageSize: 100,
  } as GridifyQuery;

  const ownershipRequestBody = {
    page: 1,
    pageSize: 100,
  } as GridifyQuery;

  // Fetch insurable objects from API
  const { accidentType, accidentTypeIsLoading } = GetAccidentType(requestBody);
  const { cities, citiesIsLoading } = GetCities(cityRequestBody);
  const { provinces, provincesIsLoading } = GetProvinces(ProvinceRequestBody);
  const { ownership, ownershipIsLoading } = GetOwnerships(ownershipRequestBody);

  // Load saved data from localStorage on mount
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

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true);

    // Extract date from accidentDate and combine with accidentTime
    let incidentDateTime;
    if (data.accidentDate && data.accidentTime) {
      // Convert to string if it's a Date object
      const dateString =
        typeof data.accidentDate === "string"
          ? data.accidentDate
          : data.accidentDate instanceof Date
          ? data.accidentDate.toISOString()
          : String(data.accidentDate);

      const dateStr = dateString.split("T")[0]; // Extract "2025-09-29"
      incidentDateTime = `${dateStr}T${data.accidentTime}:00.000Z`; // Format: "2025-09-29THH:mm:00.000Z"
    }

    const requestBody = {
      damageClaimId: declarationId,
      address: data.accidentAddress,
      cityId: data.accidentCity,
      provinceId: data.accidentProvince,
      incidentTypeId: data.accidentType,
      ownershipTypeId: data.ownershipType,
      postalCode: data.postalCode,
      incidentCause: data.damageDescription,
      restraintDescription: data.extinguish,
      occuranceDate: incidentDateTime,
      incidentImageFileIds: _.isEmpty(data.accidentImages)
        ? null
        : _.map(data.accidentImages as Array<{ id: string }>, (p) => {
            return p.id;
          }),
      hasPoliceReport: data.hasPoliceReport === "yes" ? true : false,
      policeReportNumber: data.policeReportNumber
        ? data.policeReportNumber
        : null,
      policeReportDate: data.policeReportDate ? data.policeReportDate : null,
      policeReportFileIds: _.isEmpty(data.policeReportFile)
        ? null
        : _.map(data.policeReportFile as Array<{ id: string }>, (p) => {
            return p.id;
          }),
      hasFireStationReport: data.hasFireReport === "yes" ? true : false,
      fireStationName: data.fireReportNumber ? data.fireReportNumber : null,
      fireStationReportFileIds: _.isEmpty(data.fireReportFile)
        ? null
        : _.map(data.fireReportFile as Array<{ id: string }>, (p) => {
            return p.id;
          }),
      hasWeatherReport: data.hasMeteorologicalReport === "yes" ? true : false,
      weatherCondition: data.meteorologicalReportNumber
        ? Number(data.meteorologicalReportNumber)
        : 0,
      weatherReportProbability: data.meteorologicalPredictionLevel
        ? Number(data.meteorologicalPredictionLevel)
        : 0,
    } as AddIncidentInfoToClaimRequest;
    console.log(requestBody, "requestBody");
    try {
      const res = await DamageClaimService.postApiV1DamageClaimAddIncidentInfo({
        requestBody,
      });
      if (res) {
        setIsSubmitting(false);
        toast.success("اطلاعات حادثه با موفقیت ثبت شد");
        router.push(`/damageDeclaration/cases/${declarationId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داده است");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTemporarySave = async () => {
    setIsSaving(true);

    try {
      // Save to localStorage
      // localStorage.setItem(
      //   `${STORAGE_KEY}-${declarationId}`,
      //   JSON.stringify(formData)
      // );

      // TODO: Replace with actual API call when backend is ready
      // await fetch(`/api/damage-declaration/${declarationId}/save`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("تغییرات با موفقیت ذخیره شد", {
        description: "اطلاعات شما به صورت موقت ذخیره شد",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("خطا در ذخیره‌سازی", {
        description: "لطفاً دوباره تلاش کنید",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExit = () => {
    router.push("/");
  };

  const handleNext = () => {
    // Save to localStorage before navigating
    // localStorage.setItem(
    //   `${STORAGE_KEY}-${declarationId}`,
    //   JSON.stringify(formData)
    // );
    router.push(`/damageDeclaration/cases/${declarationId}`);
  };

  const handlePrevious = () => {
    router.push(`/damageDeclaration/insurancePolicy/${declarationId}`);
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
            <AccidentForm
              initialData={formData.accident as never}
              onSubmit={handleFormSubmit}
              // onNext={handleNext}
              onPrevious={handlePrevious}
              accidentType={accidentType?.items}
              provinces={provinces?.items}
              cities={cities?.items}
              ownerships={ownership?.items}
              setProvinceId={setProvinceId}
              citiesIsLoading={citiesIsLoading}
            />
          </div>
        </div>

        <Toaster position="top-center" dir="rtl" richColors />
      </div>
    </div>
  );
}
