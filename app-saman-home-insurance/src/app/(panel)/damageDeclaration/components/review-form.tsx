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
import _ from "lodash";

interface ReviewFormProps {
  formData: Record<string, unknown>;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  reviewData: any;
  reviewDataIsLoading: boolean;
}

export default function ReviewForm({
  formData,
  onSubmit,
  onPrevious,
  isSubmitting,
  reviewData,
  reviewDataIsLoading,
}: ReviewFormProps) {
  // Cast to allow accessing nested properties without type errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = formData as any;

  console.log(reviewData, "reviewDataaaa");

  return (
    <div className="w-full">
      <h2 className="text-lg font-normal text-gray-500 mb-4 text-center">
        بررسی و تایید اطلاعات
      </h2>
      <p className="text-sm text-gray-400 mb-6 text-right">
        لطفا اطلاعات زیر را به دقت بررسی نمایید و سپس فرم را تایید و ذخیره نهایی
        کنید.
      </p>

      <div className="sm:block hidden">
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
      </div>

      <Accordion
        type="multiple"
        className="w-full space-y-2"
        defaultValue={["insured"]}
      >
        {/* اطلاعات بیمه‌گذار */}
        <AccordionItem
          value="insured"
          className="border rounded-lg px-4 bg-transparent"
        >
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <User className="flex size-8 p-2 text-secondaryBlue font-bold bg-secondaryBlue/10 items-center justify-center rounded-full" />
              <span className="font-normal text-secondaryBlue">
                اطلاعات بیمه‌گذار
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">
                  نام و نام خانوادگی:
                </span>
                <span className="text-sm font-medium">
                  {reviewData?.insurer?.firstName ||
                    "-" + " " + reviewData?.insurer?.lastName ||
                    "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">کد ملی:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {reviewData?.insurer?.nationalID || "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">تاریخ تولد:</span>
                <span className="text-sm font-medium">
                  {data.insured?.birthDate
                    ? `${data.insured.birthDate.year}/${String(
                        data.insured.birthDate.month
                      ).padStart(2, "0")}/${String(
                        data.insured.birthDate.day
                      ).padStart(2, "0")}`
                    : "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center">
                <span className="text-sm text-gray-400">شماره موبایل:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {reviewData?.insurer?.phoneNumber || "-"}
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
              <span className="font-normal text-secondaryBlue">
                اطلاعات بیمه‌نامه
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">شماره بیمه‌نامه:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {reviewData?.serialNumber || "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">
                  تحت پوشش سایر بیمه‌‌ها:
                </span>
                <span className="text-sm font-medium">
                  {!_.isEmpty(reviewData?.thirdPartyCoverage) ? "دارد" : "ندارد"}
                </span>
              </div>
              {data.policy?.hasOtherInsurance === "yes" && (
                <>
                  <div className="flex justify-start gap-x-2 items-center pb-2">
                    <span className="text-sm text-gray-400">
                      نام شرکت بیمه‌گر:
                    </span>
                    <span className="text-sm font-medium">
                      {data.policy?.otherInsuranceCompany ||
                        "سامان، بیمه پارسیان فردیس، پلاک ۵۷"}
                    </span>
                  </div>
                  <div className="flex justify-start gap-x-2 items-center">
                    <span className="text-sm text-gray-400">
                      شماره بیمه‌نامه:
                    </span>
                    <span className="text-sm font-medium" dir="ltr">
                      {data.policy?.otherPolicyNumber || "۲۷۳۴۰۰۵۴۶۰۶۰"}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-400">فایل بیمه نامه:</span>
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
              <span className="font-normal text-secondaryBlue">
                اطلاعات حادثه
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">نوع و علت:</span>
                <span className="text-sm font-medium text-right">
                  {reviewData?.incident?.incidentType?.title ||
                    "-" + "، " + reviewData?.incident?.incidentCause ||
                    "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center">
                <span className="text-sm text-gray-400">تاریخ و ساعت:</span>
                <span className="text-sm font-medium">
                  {reviewData?.incident?.occuranceDate
                    ? (() => {
                        const date = new Date(
                          reviewData.incident.occuranceDate
                        );
                        const persianDate = date.toLocaleDateString("fa-IR");
                        const time = date.toLocaleTimeString("fa-IR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        return `${persianDate} - ${time}`;
                      })()
                    : "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">نوع مالکیت:</span>
                <span className="text-sm font-medium">
                  {reviewData?.incident?.ownershipType?.title || "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">محل:</span>
                <span className="text-sm font-medium text-right">
                  {reviewData?.incident?.address || "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">کد پستی:</span>
                <span className="text-sm font-medium" dir="ltr">
                  {reviewData?.incident?.postalCode || "-"}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-400">تصاویر حادثه:</span>
                <span className="text-sm font-medium underline text-primary cursor-pointer">
                  مشاهده
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-400">
                  نام ایستگاه آتش نشانی:
                </span>
                <span className="text-sm font-medium">
                  {reviewData?.incident?.fireStationName || "-"}
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
              <span className="font-normal text-secondaryBlue">
                موارد آسیب دیده
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {_.map(reviewData?.damagedObjects, (item, i) => {
                return (
                  <div className="flex justify-start gap-x-2 items-center pb-2">
                    <span className="text-sm text-gray-400">مورد {i + 1}:</span>
                    <span className="text-sm font-medium">
                      {item.insurableObject?.title +
                        "، " +
                        item.estimatedLoss &&
                        item.estimatedLoss.toLocaleString()}{" "}
                      ریال
                    </span>
                  </div>
                );
              })}
              {/* <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">مورد ۱:</span>
                <span className="text-sm font-medium">
                  اثاثیه، {data.cases?.[0]?.amount || "۱۵,۰۰۰,۰۰۰"} ریال
                </span>
              </div> */}
              {/* <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">مورد ۱:</span>
                <span className="text-sm font-medium">
                  پنجره‌ها، {data.cases?.[1]?.amount || "۲۵,۰۰۰,۰۰۰"} ریال
                </span>
              </div> */}
              <div className="flex justify-start gap-x-2 items-center">
                <span className="text-sm text-gray-400">جمع تقریبی خسارت:</span>
                <span className="text-sm font-medium">
                  {reviewData?.damagedObjects && Array.isArray(reviewData.damagedObjects)
                    ? _.sumBy(reviewData.damagedObjects, 'estimatedLoss').toLocaleString()
                    : "-"}{" "}
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
              <span className="font-normal text-secondaryBlue">
                اطلاعات ذینفعان
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">
                  شماره حساب بیمه گذار:
                </span>
                <span className="text-sm font-medium" dir="ltr">
                  {reviewData?.insurer?.accountNumber || "-"}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center pb-2">
                <span className="text-sm text-gray-400">
                  شماره شبا بیمه‌گذار:
                </span>
                <span className="text-sm font-medium" dir="ltr">
                  {`${reviewData?.insurer?.iban || "-"}`}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 items-center">
                <span className="text-sm text-gray-400">ذینفع دیگر:</span>
                <span className="text-sm font-medium">
                  {!reviewData?.stakeHolders?.isOwner ? "دارد" : "ندارد"}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="sm:hidden block">
        <div className="flex gap-x-2 items-center mt-6 justify-between">
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
      </div>
    </div>
  );
}
