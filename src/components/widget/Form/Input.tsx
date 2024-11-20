import { FC, ReactNode } from "react";
import Image from "next/image";

interface AppInputProps {
  label?: string;
  id: string;
  name: string;
  type: "text" | "number" | "file" | "email" | "password" | "date";
  value?: string | number | readonly string[] | File | null;
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
  // onKeyDown,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file input changes
    if (e.target.files) {
      onChange(e); // Pass the file to the parent
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        {type === "file" ? (
          <div className="flex items-center justify-between">
            <input
              id={id}
              name={name}
              type="file"
              onChange={handleFileChange}
              disabled={disabled}
              className="w-full rounded-sm border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {value &&
              (value instanceof File ? (
                <div className="ml-4">
                  <Image
                    src={URL.createObjectURL(value)}
                    alt="Selected Logo"
                    width={60}
                    height={60}
                    className="rounded-sm object-cover"
                  />
                </div>
              ) : typeof value === "string" ? (
                <div className="ml-4">
                  <img
                    src={value as string}
                    alt="Selected Logo"
                    width={70}
                    height={70}
                    className="rounded-sm object-cover"
                  />
                </div>
              ) : (
                <span className="absolute right-4 top-4 text-sm text-black dark:text-white">
                  Aucun fichier sélectionné
                </span>
              ))}
          </div>
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value as string | number | readonly string[]}
            autoComplete={autoComplete}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            className={`w-full rounded-sm border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
          />
        )}

        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
    </div>
  );
};

export default AppInput;
