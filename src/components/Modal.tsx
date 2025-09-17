"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};
export default function Modal({ open, onClose, title, children }: Props) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
            initial={
              reduce ? { opacity: 0 } : { y: 24, scale: 0.98, opacity: 0 }
            }
            animate={reduce ? { opacity: 1 } : { y: 0, scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title ? (
              <h3 className="mb-3 text-lg font-semibold">{title}</h3>
            ) : null}
            {children}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-md border border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
