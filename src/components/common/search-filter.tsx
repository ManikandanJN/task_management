import React, { memo, useCallback, useEffect, useState } from "react";
import { CloseIcon, SearchIcon } from "../../icons";

interface SearchProps {
  handleSearch: (newState: string) => void;
  placeholder: string;
}

const SearchFilter: React.FC<SearchProps> = ({ handleSearch, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleSearch(inputValue);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [inputValue]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value ?? "";
    setInputValue(value);
  }, []);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1.5 lg:top-2">
        <SearchIcon className="h-4 w-4" />
      </span>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder={placeholder}
        className="text-app-color hover:border-app-color focus:border-app-color border-gray-400 w-full rounded-full border-[1px] border-solid py-0.5 lg:py-1.5 pl-9 lg:pr-[50px] text-[12px] lg:text-sm font-semibold focus:ring-0"
      />
      <span className="absolute right-3 top-1 lg:top-2">
        {inputValue.length > 0 && (
          <button onClick={() => setInputValue("")}>
            <CloseIcon className="text-app-color h-4 w-4" />
          </button>
        )}
      </span>
    </div>
  );
};

export default memo(SearchFilter);
