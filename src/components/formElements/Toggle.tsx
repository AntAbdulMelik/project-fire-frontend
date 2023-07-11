type Props = {
  label: string;
  htmlFor: string;
  id: string;
  name: string;
  checked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Toggle = ({
  label,
  htmlFor,
  id,
  name,
  checked,
  handleCheckboxChange,
}: Props) => {
  return (
    <label
      className="relative inline-flex cursor-pointer items-center"
      htmlFor={htmlFor}
    >
      <input
        className="peer sr-only"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <div className="peer h-6 w-11 rounded-full bg-misty-moonstone after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-misty-moonstone after:bg-white after:transition-all after:content-[''] peer-checked:bg-evergreen peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-transparent"></div>
      <span className="ml-3 font-gilroy-medium text-base font-medium leading-[22px] text-midnight-grey">
        {label}
      </span>
    </label>
  );
};

export default Toggle;
