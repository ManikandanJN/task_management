import React from "react";

interface LabelProps {
  title: string;
}

export const Label: React.FC<LabelProps> = ({ title }) => {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {title}
    </label>
  );
};
