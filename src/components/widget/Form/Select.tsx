import { FC, ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface AppSelectProps {
  label?: string;
  icon?: ReactNode;
}

const AppSelect: FC<AppSelectProps> = ({ label, icon }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      {label && (
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          {label}
        </label>
      )}

      <div className="relative z-20 bg-white dark:bg-form-input">
        {icon && (
          <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
            {icon}
          </span>
        )}

        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Country
          </option>
          <option value="USA" className="text-body dark:text-bodydark">
            USA
          </option>
          <option value="UK" className="text-body dark:text-bodydark">
            UK
          </option>
          <option value="Canada" className="text-body dark:text-bodydark">
            Canada
          </option>
        </select>

        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <ChevronDown />
        </span>
      </div>
    </div>
  );
};

export default AppSelect;
