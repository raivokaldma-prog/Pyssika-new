import { useEffect, useRef, type ReactNode } from "react";

interface AccessibleModalProps {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  onPrev?: () => void;
  onNext?: () => void;
  children: ReactNode;
}

export function AccessibleModal({
  open,
  onClose,
  ariaLabel,
  ariaLabelledBy,
  onPrev,
  onNext,
  children,
}: AccessibleModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);

  onCloseRef.current = onClose;
  onPrevRef.current = onPrev;
  onNextRef.current = onNext;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        lastTriggerRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        dialog.showModal();
        requestAnimationFrame(() => {
          const closeBtn = dialog.querySelector<HTMLElement>("[data-modal-close]");
          if (closeBtn) {
            closeBtn.focus();
          } else {
            dialog.focus();
          }
        });
      }

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleCancel = (e: Event) => {
        e.preventDefault();
        onCloseRef.current();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight" && onNextRef.current) {
          e.preventDefault();
          onNextRef.current();
        } else if (e.key === "ArrowLeft" && onPrevRef.current) {
          e.preventDefault();
          onPrevRef.current();
        }
      };

      dialog.addEventListener("cancel", handleCancel);
      dialog.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        dialog.removeEventListener("cancel", handleCancel);
        dialog.removeEventListener("keydown", handleKeyDown);
      };
    } else if (dialog.open) {
      dialog.close();
      lastTriggerRef.current?.focus();
      lastTriggerRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) {
        dialog.close();
      }
      if (lastTriggerRef.current) {
        lastTriggerRef.current.focus();
        lastTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      className="fixed inset-0 m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-4 text-inherit backdrop:bg-cellar-deep/88 backdrop:backdrop-blur-[2px] open:flex open:h-full open:w-full open:items-center open:justify-center"
    >
      {open ? children : null}
    </dialog>
  );
}
