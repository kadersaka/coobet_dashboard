import { FC } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment, { Moment } from "moment";
import "moment/locale/fr";

interface AppDateIntervalDateTimePickerProps {
  id: string;
  name: string;
  placeholder: string;
  selectedDateTime: Date | Moment | undefined;
  onDateChange: (date: Date | Moment) => void;
}

const AppDateIntervalDateTimePicker: FC<AppDateIntervalDateTimePickerProps> = ({
  id,
  name,
  placeholder,
  selectedDateTime,
  onDateChange,
}) => {
  moment.locale("fr");

  return (
    <div>
      <Datetime
        value={selectedDateTime}
        onChange={(date) => {
          if (typeof date === "string") {
            // Convertissez la chaîne en un objet Moment
            onDateChange(moment(date));
          } else {
            onDateChange(date);
          }
        }}
        locale="fr-FR"
        inputProps={{
          id: id,
          name: name,
          placeholder: placeholder,

          className: `w-full text-black text-md rounded-md bg-backgroundColor py-1.5 px-2 border border-secondary  border-gray-200 focus:outline-none focus:border-2 focus:border-secondary z-0 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px]`,
          autoComplete: "off",
        }}
        timeFormat="HH:mm"
        dateFormat="DD-MM-YYYY"
        closeOnSelect={false}
        // className={` w-full text-black text-md rounded-md bg-transparent py-1.5 px-2 border-2  border-gray-200 focus:outline-none focus:border-2 focus:border-secondary`}
      />
    </div>
  );
};

export default AppDateIntervalDateTimePicker;
