import React, { useCallback } from "react";
import { classes } from "../../utils/classes";
import './Input.css';

interface InputProps {
  className?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  className,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      name={name}
      className={classes(["Input", className])}
    />
  );
};
