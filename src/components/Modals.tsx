import { type ReactNode, useEffect } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  description: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ open, title, description, children, onClose }: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="relative w-full max-w-lg rounded-3xl border border-amber-300/25 bg-slate-950 p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-amber-100/15 bg-slate-900/80 p-2 text-amber-100 transition hover:bg-slate-900/95"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 id="modal-title" className="text-xl font-semibold text-amber-50">
              {title}
            </h2>
            <p id="modal-description" className="text-sm text-amber-100/75">
              {description}
            </p>
          </div>
          <div className="space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => (
  <Modal open={open} title={title} description={description} onClose={onCancel}>
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex justify-center rounded-xl border border-amber-100/25 bg-slate-900/20 px-4 py-3 text-sm font-medium text-amber-100 transition hover:bg-slate-900/35"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="inline-flex justify-center rounded-xl bg-rose-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-rose-600"
      >
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

export { ConfirmModal, Modal };
