import { Check, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface PropsType {
  steps: {
    id: string;
    label: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
  currentStep: number;
  completedSteps: number[];
  handleStepClick: (index: number) => void;
}

const WizardSteps = (props: PropsType) => {
  const { steps, currentStep, completedSteps, handleStepClick } = props;
  return (
    <div className="flex items-center justify-start md:justify-center gap-x-2 py-6 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center gap-x-2 min-w-max pl-4 pr-4 md:px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          const isAccessible =
            index === 0 || completedSteps.includes(index - 1);
          const isLocked = !isAccessible;

          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => handleStepClick(index)}
                // disabled={isLocked}
                className={`flex items-center gap-2 transition-colors ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-primary"
                    : isAccessible
                    ? "text-gray-500 hover:text-gray-700"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex w-8 h-8 p-2 bg-primary/10 items-center justify-center rounded-full transition-colors`}
                >
                  {isCompleted ? (
                    <Check className="size-7 text-primary" />
                  ) : (
                    <Icon className="size-7" />
                  )}
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-2 ${
                    isCompleted ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WizardSteps;
