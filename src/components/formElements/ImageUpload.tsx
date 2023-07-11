import { plus } from "assets/media";

type Props = {
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  label: string;
  image: File | undefined;
  handleImageUpload: (image: File) => void;
};

const ImageUpload = ({
  containerClassName,
  labelClassName,
  inputClassName,
  label,
  image,
  handleImageUpload,
}: Props) => {
  return (
    <div className={`flex flex-col items-start ${containerClassName}`}>
      <span
        className={`font-gilroy-medium text-base font-medium text-midnight-grey ${labelClassName}`}
      >
        {label}
      </span>
      <label
        className={`flex max-h-[155px] cursor-pointer flex-col items-center justify-center gap-[10px] overflow-hidden rounded-md border border-dashed ${inputClassName}`}
        htmlFor="profileImage"
      >
        {!image ? (
          <>
            <img className="h-[14px] w-[14px]" src={plus} alt="Upload icon" />
            <span className="font-gilroy-regular text-sm font-normal leading-6 text-evergreen">
              Upload
            </span>
          </>
        ) : (
          <img
            className="h-full w-full object-cover"
            src={URL.createObjectURL(image)}
            alt="Profile image"
          />
        )}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="profileImage"
          name="profileImage"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              handleImageUpload(file);
            }
          }}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
