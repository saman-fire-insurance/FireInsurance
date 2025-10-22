"use client";

import { Button } from "@/components/ui/button";
import {
  User,
  BookCheck,
  Home,
  List,
  FileText,
  ArrowLeftIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ReviewFormProps {
  formData: Record<string, unknown>;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export default function ReviewForm({
  formData,
  onSubmit,
  onPrevious,
  isSubmitting,
}: ReviewFormProps) {
  // Cast to allow accessing nested properties without type errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = formData as any;

  return (
    <div className="w-full">
      <h2 className="text-lg font-normal text-gray-500 mb-4 text-center">
        بررسی و تایید اطلاعات
      </h2>
      <p className="text-sm text-gray-400 mb-6 text-right">
        لطفا اطلاعات زیر را به دقت بررسی نمایید و سپس فرم را تایید و ذخیره نهایی
        کنید.
      </p>

      <div className="flex gap-x-2 items-center mb-8 justify-between">
        <Button
          variant="default"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-primary text-white px-8 flex-2"
        >
          {isSubmitting ? "در حال ارسال..." : "تایید و ارسال"}
          <ArrowLeftIcon className="size-4 mr-2" />
        </Button>
        <Button
          variant="transparent"
          onClick={onPrevious}
          className="border-gray-300 flex-1"
        >
          مرحله قبلی
        </Button>
      </div>

      <Accordion type="multiple" className="w-full space-y-2">
        {/* اطلاعات بیمه‌گذار */}
        <AccordionItem
          value="insured"
          className="border rounded-lg px-4 bg-transparent"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <User className="flex size-8 p-2 text-secondaryBlue font-bold bg-secondaryBlue/10 items-center justify-center rounded-full" />
              <span className="font-normal text-secondaryBlue">اطلاعات بیمه‌گذار</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">
                  نام و نام خانوادگی:
                </span>
                <span className="text-sm font-medium">
                  {data.insured?.fullName || "مریم نیازی"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">کد ملی:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {data.insured?.nationalId || "۰۸۵۱۲۵۴۵۴۰"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">تاریخ تولد:</span>
                <span className="text-sm font-medium">
                  {data.insured?.birthDate
                    ? `${data.insured.birthDate.year}/${String(
                        data.insured.birthDate.month
                      ).padStart(2, "0")}/${String(
                        data.insured.birthDate.day
                      ).padStart(2, "0")}`
                    : "۱۳۷۶/۰۱/۳۱"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">شماره موبایل:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {data.insured?.mobileNumber || "۰۹۱۵۳۳۴۵۴۸۷"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* اطلاعات بیمه‌نامه */}
        <AccordionItem
          value="policy"
          className="border rounded-lg px-4 bg-transparent"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <BookCheck className="flex size-8 p-2 text-secondaryBlue font-bold bg-secondaryBlue/10 items-center justify-center rounded-full" />
              <span className="font-normal text-secondaryBlue">اطلاعات بیمه‌نامه</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">شماره بیمه‌نامه:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {data.policy?.policyNumber || "۱۶۴۲۴۲۴۰۰۰۱۵۴"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">
                  تحت پوشش سایر بیمه‌گاه:
                </span>
                <span className="text-sm font-medium">
                  {data.policy?.hasOtherInsurance === "yes"
                    ? "دارد"
                    : "ندارد"}
                </span>
              </div>
              {data.policy?.hasOtherInsurance === "yes" && (
                <>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm text-gray-600">
                      نام شرکت بیمه‌گر:
                    </span>
                    <span className="text-sm font-medium">
                      {data.policy?.otherInsuranceCompany ||
                        "سامان، بیمه پارسیان فردیس، پلاک ۵۷"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      شماره بیمه‌نامه:
                    </span>
                    <span className="text-sm font-medium" dir="ltr">
                      {data.policy?.otherPolicyNumber || "۲۷۳۴۰۰۵۴۶۰۶۰"}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-600">فایل بیمه نامه:</span>
                <span className="text-sm font-medium underline text-primary cursor-pointer">
                  مشاهده
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* اطلاعات حادثه */}
        <AccordionItem
          value="accident"
          className="border rounded-lg px-4 bg-transparent"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Home className="flex size-8 p-2 text-secondaryBlue font-bold bg-secondaryBlue/10 items-center justify-center rounded-full" />
              <span className="font-normal text-secondaryBlue">اطلاعات حادثه</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-start border-b pb-2">
                <span className="text-sm text-gray-600">نوع و علت:</span>
                <span className="text-sm font-medium text-right">
                  {data.accident?.accidentType ||
                    "آتش سوزی، این حادثه به علت نشت گاز آزگرمکن در منزل اتفاق افتاده است."}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">تاریخ و ساعت:</span>
                <span className="text-sm font-medium">
                  {data.accident?.accidentDate
                    ? new Date(
                        data.accident.accidentDate
                      ).toLocaleDateString("fa-IR")
                    : "۱۴۰۴/۰۲/۱۶"}{" "}
                  - {data.accident?.accidentTime || "۱۴:۳۰"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">نوع مالکیت:</span>
                <span className="text-sm font-medium">
                  {data.accident?.ownershipType || "استیجاری"}
                </span>
              </div>
              <div className="flex justify-between items-start border-b pb-2">
                <span className="text-sm text-gray-600">محل:</span>
                <span className="text-sm font-medium text-right">
                  {data.accident?.accidentProvince &&
                  data.accident?.accidentCity
                    ? `${data.accident.accidentProvince}، ${data.accident.accidentCity}`
                    : "تهران، تهران، بلوارکاشاورز، خیابان فردیس، پلاک ۵۷"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">کد پستی:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {data.accident?.postalCode || "۱۸۱۲۵۱۴۳۱"}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-600">تصاویر حادثه:</span>
                <span className="text-sm font-medium underline text-primary cursor-pointer">
                  مشاهده
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-600">
                  نام ایستگاه آتش نشانی:
                </span>
                <span className="text-sm font-medium">
                  {data.accident?.fireStationName || "تهران مرکز"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* موارد آسیب دیده */}
        <AccordionItem
          value="cases"
          className="border rounded-lg px-4 bg-transparent"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <List className="flex size-8 p-2 text-secondaryBlue font-bold bg-secondaryBlue/10 items-center justify-center rounded-full" />
              <span className="font-normal text-secondaryBlue">موارد آسیب دیده</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">مورد ۱:</span>
                <span className="text-sm font-medium">
                  اثاثیه، {data.cases?.[0]?.amount || "۱۵,۰۰۰,۰۰۰"} ریال
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">مورد ۱:</span>
                <span className="text-sm font-medium">
                  پنجره‌ها، {data.cases?.[1]?.amount || "۲۵,۰۰۰,۰۰۰"} ریال
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">جمع تقریبی خسارت:</span>
                <span className="text-sm font-medium">
                  {(data.cases as Array<{ amount?: number }>)?.reduce(
                    (sum: number, item) => sum + (item.amount || 0),
                    0
                  ) || "۴۰,۰۰۰,۰۰۰"}{" "}
                  ریال
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* اطلاعات ذینفعان */}
        <AccordionItem
          value="beneficiaries"
          className="border rounded-lg px-4 bg-transparent"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <FileText className="flex size-8 p-2 text-secondaryBlue font-bold bg-secondaryBlue/10 items-center justify-center rounded-full" />
              <span className="font-normal text-secondaryBlue">اطلاعات ذینفعان</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">
                  شماره حساب بیمه گذار:
                </span>
                <span className="text-sm font-medium" dir="ltr">
                  {data.beneficiaries?.accountNumber || "۷۴۱۵۶۳۴۱۷۱"}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-600">
                  شماره شبا بیمه‌گذار:
                </span>
                <span className="text-sm font-medium" dir="ltr">
                  {data.beneficiaries?.iban || "IR۷۴۱۰۵۶۴۵۱۰۰۰۰۲۱۲۴"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ذینفع دیگر:</span>
                <span className="text-sm font-medium">
                  {data.beneficiaries?.hasOtherBeneficiaries
                    ? "دارد"
                    : "ندارد"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
