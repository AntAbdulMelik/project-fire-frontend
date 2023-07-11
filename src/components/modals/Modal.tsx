import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import Backdrop from "components/utils/Backdrop";

type Props = {
  className?: string;
  header: string;
  show: boolean;
  isError?: boolean;
  handleConfirmation: () => void;
  handleCancellation: () => void;
  children: React.ReactNode;
};

const Modal = ({
  className,
  show,
  header,
  handleConfirmation,
  handleCancellation,
  isError,
  children,
}: Props) => {
  const content = (
    <>
      {show && <Backdrop onClick={handleCancellation} />}
      {show && (
        <motion.div
          className={`fixed left-1/2 top-1/2 z-20 w-3/5 -translate-x-1/2 -translate-y-1/2 transform ${className}`}
          initial={{ opacity: 0, x: "-50%", y: "-100%" }}
          animate={{
            opacity: 1,
            x: "0%",
            y: "0%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <header className="w-full bg-deep-teal p-4 text-white">
            <h2 className="font-gilroy-semi-bold text-xl font-semibold">
              {header}
            </h2>
          </header>
          <div className="p-4">{children}</div>
          <footer className="flex items-center justify-end gap-2 p-4 font-gilroy-semi-bold font-semibold">
            {!isError && (
              <button
                className="rounded bg-golden-tangerine px-6 py-2 text-midnight-grey hover:saturate-150"
                onClick={handleConfirmation}
              >
                CONFIRM
              </button>
            )}
            <button
              className="rounded bg-slate-mist px-6 py-2 text-white hover:bg-opacity-80"
              onClick={handleCancellation}
            >
              {isError ? "OKAY" : "CANCEL"}
            </button>
          </footer>
        </motion.div>
      )}
    </>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
};

export default Modal;
