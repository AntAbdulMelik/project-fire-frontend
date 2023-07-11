type Props = {
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  label: string;
  htmlFor: string;
  id: string;
  name: string;
  checked: boolean;
  handleRadioButtonChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton = ({
  containerClassName,
  inputClassName,
  labelClassName,
  label,
  htmlFor,
  id,
  name,
  checked,
  handleRadioButtonChange,
}: Props) => {
  return (
    <div className={`flex items-center justify-start ${containerClassName}`}>
      <input
        className={`border-2 focus:ring-transparent ${inputClassName}`}
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={handleRadioButtonChange}
      />
      <label className={`${labelClassName}`} htmlFor={htmlFor}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
