type Props = {
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  label: string;
  htmlFor: string;
  id: string;
  name: string;
  checked: boolean;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({
  containerClassName,
  inputClassName,
  labelClassName,
  label,
  htmlFor,
  id,
  name,
  checked,
  handleCheckboxChange,
}: Props) => {
  return (
    <div className={`flex items-center justify-start ${containerClassName}`}>
      <input
        className={`rounded-sm border-2 focus:ring-transparent ${inputClassName}`}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label className={`${labelClassName}`} htmlFor={htmlFor}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
