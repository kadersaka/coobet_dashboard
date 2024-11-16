import { FC, ReactNode } from "react";
interface AppInputProps {
  label?: string;
  id: string;
  name: string;
  type: "text" | "number" | "file" | "email" | "password" | "date";
  value?: string | number | readonly string[];
  placeholder: string;
  autoComplete?: string;
  icon?: ReactNode;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onKeyDown?: (e: React.KeyboardEventHandler<HTMLInputElement>) => void;
}

const AppInput: FC<AppInputProps> = ({
  label,
  id,
  name,
  type,
  value,
  placeholder,
  autoComplete,
  icon,
  disabled,
  onChange,
  //onKeyDown,
}) => {
  return (
    <div>
      {label && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          //  required
          className={`w-full rounded-sm border-[1.5px] border-stroke  bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
        />

        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
    </div>
  );
};

export default AppInput;
