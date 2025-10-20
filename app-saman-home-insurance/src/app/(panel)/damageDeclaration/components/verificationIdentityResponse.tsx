import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeftIcon,
  BadgeCheck,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

interface PropsType {
  verificationResult: any;
  handleBackToEdit: () => void;
  handleContinue: () => void;
}

const VerificationIdentityResponse = (props: PropsType) => {
  const { verificationResult, handleBackToEdit, handleContinue } = props;
  return (
    <div className="flex flex-col gap-y-10 w-full">
      <h2 className="text-xl font-normal text-secondary text-center">
        اطلاعات بیمه گذار
      </h2>

      {verificationResult ? (
          <div className="flex flex-col gap-y-6 w-full">
            <Card className="w-full bg-success/10 border-success/20">
              <CardContent className="p-6">
                <div className="flex flex-col gap-y-3 items-start">
                  {/* Success Badge */}
                  <div className="flex justify-center">
                    <BadgeCheck className="size-10 text-success" />
                  </div>

                  {/* Title */}
                  <h3 className="text-center text-success font-semibold text-lg mb-6">
                    نتیجه استعلام هویت:
                  </h3>
                </div>

                {/* Information Fields */}
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-placeholder text-right">
                      نام و نام خانوادگی
                    </span>
                    <p className="text-right text-secondary text-sm font-medium">
                      {verificationResult.fullName}
                    </p>
                  </div>

                  {/* Province */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-placeholder text-right">
                      استان
                    </span>
                    <p className="text-right text-secondary text-sm font-medium">
                      {verificationResult.province}
                    </p>
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-placeholder text-right">
                      شهر
                    </span>
                    <p className="text-right text-secondary text-sm font-medium">
                      {verificationResult.city}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-placeholder text-right">
                      آدرس
                    </span>
                    <p className="text-right text-secondary text-sm font-medium">
                      {verificationResult.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-row w-full gap-x-2">
              <Button
                onClick={handleContinue}
                className="w-3/5 bg-primary hover:bg-primary/90"
              >
                تایید و ادامه
                <ArrowLeftIcon className="size-5 mr-2" />
              </Button>
              <Button
                onClick={handleBackToEdit}
                variant="outline"
                className="border-gray-200 text-secondary cursor-pointer bg-transparent w-2/5"
              >
                مرحله قبلی
              </Button>
            </div>
          </div>
      ) : (
        <div className="flex flex-col gap-y-6 w-full">
          <Card className="w-full bg-destructive/10 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex flex-col gap-y-3 items-start">
                {/* Success Badge */}
                <div className="flex justify-center">
                  <CircleAlert className="size-10 text-destructive" />
                </div>

                {/* Title */}
                <h3 className="text-center text-destructive font-semibold text-lg mb-6">
                  نتیجه ای یافت نشد!
                </h3>
              </div>
              <p className="text-sm font-medium text-secondary">
                کد ملی یا تاریخ تولد را اشتباه وارد کرده اید، لطفا مجددا تلاش
                کنید.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-row w-full">
            <Button
              onClick={handleBackToEdit}
              variant="outline"
              className="border-gray-200 text-secondary cursor-pointer bg-transparent w-full"
            >
              مرحله قبلی
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationIdentityResponse;
