type Props = {
  firstButtonClassName?: string;
  secondButtonClassName?: string;
  firstButtonText: string;
  secondButtonText: string;
  handleFirstButtonClick: () => void;
  handleSecondButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const Footer = ({
  firstButtonClassName,
  secondButtonClassName,
  firstButtonText,
  secondButtonText,
  handleFirstButtonClick,
  handleSecondButtonClick,
}: Props) => {
  return (
    <footer className="absolute bottom-0 left-0 flex w-full items-center justify-end gap-2 bg-white p-6">
      <button
        className={`rounded-md px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] ${firstButtonClassName}`}
        onClick={handleFirstButtonClick}
      >
        {firstButtonText}
      </button>
      <button
        className={`rounded-md px-4 py-2 font-inter-semi-bold text-base font-semibold tracking-[-0.015em] ${secondButtonClassName}`}
        onClick={handleSecondButtonClick}
      >
        {secondButtonText}
      </button>
    </footer>
  );
};

export default Footer;
