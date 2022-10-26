import React from "react";
import { classes } from "../../utils/classes";
import { Input } from "../Input/Input";
import './Field.css';

interface FieldProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  label: string;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({ className, value, name, label, onChange }) => {
  return (
    <div className={classes(['Field', className])}>
      <label htmlFor={name} className="Field__label">{label}</label>
      <Input value={value} onChange={onChange} name={name} className="Field__input"/>
    </div>
  );
};
