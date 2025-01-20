import moment from "moment";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface DatePickerProps {
  selectedDate?: any;
  onChange: (selectedValue: string) => void;
  type: string;
  direction?: any;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  type = "Date",
  direction = "up",
}) => {
  const [value, setValue] = useState(
    selectedDate
      ? {
          startDate: moment(selectedDate).toDate(),
          endDate: moment(selectedDate).toDate(),
        }
      : null
  );

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onChange(newValue?.startDate?.toISOString());
  };

  return (
    <Datepicker
      primaryColor={"purple"}
      value={value}
      onChange={handleValueChange}
      asSingle={true}
      useRange={type === "Date" ? false : true}
      inputClassName="w-full px-4 py-0.5 sm:py-1.5 text-sm sm:text-base border border-gray-400 rounded-full bg-light-gray text-gray-700"
      displayFormat="DD/MM/YYYY"
      popoverDirection={direction === "down" ? "down" : "up"}
    />
  );
};

export default CustomDatePicker;
