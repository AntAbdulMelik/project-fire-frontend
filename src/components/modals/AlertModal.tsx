import { motion } from "framer-motion";

import { alert } from "assets/media";

type Props = {
  alertTitle: string;
  alertDescription: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtoncolor: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const AlertModal = ({
  alertTitle,
  alertDescription,
  cancelButtonText,
  confirmButtonText,
  confirmButtoncolor,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-50%", y: "-100%" }}
      animate={{
        opacity: 1,
        x: "0%",
        y: "0%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-1/2 top-1/2 z-30 flex w-[424px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md shadow-[0_3px_6px_-4px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.08),0_9px_28px_8px_rgba(0,0,0,0.05)]"
    >
      <div className="flex flex-col gap-6 overflow-hidden rounded-xl bg-white p-6">
        <div className="flex gap-4">
          <img src={alert} className="h-6 w-6" />
          <div className="flex flex-col gap-1">
            <p className="font-gilroy-bold text-base font-bold text-inky-twilight">
              {alertTitle}
            </p>
            <p className="font-gilroy-regular text-sm font-normal leading-[22px] text-inky-twilight">
              {alertDescription}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="rounded-md border border-deep-teal px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-evergreen"
            onClick={() => onCancel()}
          >
            {cancelButtonText || "Cancel"}
          </button>
          <button
            className="rounded-md px-[15px] py-[6.4px] font-inter-semi-bold text-base font-semibold tracking-[-0.015em] text-white shadow-[0_2px_0_rgba(0,0,0,0.043)]"
            style={{ backgroundColor: confirmButtoncolor }}
            onClick={() => onConfirm()}
          >
            {confirmButtonText || "Confirm"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertModal;
