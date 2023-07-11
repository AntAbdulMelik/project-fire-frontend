import { forwardRef } from "react";

type Props = {
  containerClassName?: string;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  required?: boolean;
  type: string;
  label: string;
  htmlFor: string;
  id: string;
  name: string;
  min?: number;
  step?: number;
  placeholder?: string;
  value: string;
  handleInput: (input: string) => void;
};

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      containerClassName,
      labelClassName,
      inputClassName,
      required,
      type,
      label,
      htmlFor,
      id,
      name,
      min,
      step,
      placeholder,
      value,
      handleInput,
    },
    ref
  ) => {
    return (
      <div className={`flex w-full flex-col items-start ${containerClassName}`}>
        <label
          className={`font-gilroy-medium text-base font-medium text-midnight-grey ${labelClassName}`}
          htmlFor={htmlFor}
        >
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full rounded-md border font-gilroy-regular font-normal focus:shadow-md focus:ring-transparent ${inputClassName}`}
          required={required}
          type={type}
          id={id}
          name={name}
          min={type === "number" ? min : undefined}
          step={type === "number" ? step : undefined}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={(event) => handleInput(event.target.value)}
        />
      </div>
    );
  }
);

export default InputField;
