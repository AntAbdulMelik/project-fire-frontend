import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  size?: number;
};

const LoadingSpinner = ({ size = 100 }: Props) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClipLoader
        color="#43A57C"
        cssOverride={{ borderWidth: "5px" }}
        size={size}
      />
    </div>
  );
};

export default LoadingSpinner;
