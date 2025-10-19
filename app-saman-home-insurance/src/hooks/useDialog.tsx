import { create } from "zustand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface DialogState {
  isOpen: boolean;
  title?: string | undefined;
  description?: ReactNode | undefined;
  content: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
}

interface DialogStore extends DialogState {
  showDialog: (config: Omit<DialogState, "isOpen">) => void;
  hideDialog: () => void;
}

const useDialogStore = create<DialogStore>(
  (set: (state: Partial<DialogStore>) => void) => ({
    isOpen: false,
    title: undefined,
    description: undefined,
    content: null,
    onConfirm: undefined,
    onCancel: undefined,
    confirmText: "Confirm",
    cancelText: "Cancel",
    showFooter: true,
    showDialog: (config: Omit<DialogState, "isOpen">) =>
      set({ ...config, isOpen: true }),
    hideDialog: () => set({ isOpen: false }),
  })
);

export const useDialog = () => {
  const {
    isOpen,
    title,
    description,
    content,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    showFooter,
    showDialog,
    hideDialog,
  } = useDialogStore();

  const DialogComponent = () => (
    <Dialog open={isOpen} onOpenChange={(open) => !open && hideDialog()}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {content}
        {showFooter && (
          <DialogFooter>
            {onCancel && (
              <Button
                variant="outline"
                onClick={() => {
                  onCancel();
                  hideDialog();
                }}
              >
                {cancelText}
              </Button>
            )}
            {onConfirm && (
              <Button
                onClick={() => {
                  onConfirm();
                  hideDialog();
                }}
              >
                {confirmText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );

  return {
    showDialog,
    hideDialog,
    DialogComponent,
  };
};
