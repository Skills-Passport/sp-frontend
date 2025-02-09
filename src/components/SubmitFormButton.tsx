import React from 'react';
import { Button } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";

interface SubmitFormButtonProps {
  isSubmitting: boolean;
  submitLabel: string;
  extraContainerClasses?: string;
  extraElement?: React.ReactNode;
}

const SubmitFormButton = ({
  isSubmitting,
  submitLabel,
  extraContainerClasses,
  extraElement
}: SubmitFormButtonProps) => {
  return (
    <div
      className="flex items-center justify-between"
    >
      {extraElement}
      <div className={`flex flex-1 justify-end ${extraContainerClasses ?? ""}`}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn w-[105.71px] text-sm"
        >
          {isSubmitting ? (
            <>
              <LoaderCircleIcon className="max-w-[25px] animate-spin" />
            </>
          ) : (
            <>{submitLabel}</>
          )}
        </Button>
      </div>
    </div>
  );
}

export default SubmitFormButton