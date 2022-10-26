import React from "react";
import { isLoading, Loadable } from "../../store/Loadable";
import { Button } from "../Button/Button";
import { Field } from "../Field/Field";
import "./LoginForm.css";

interface LoginFormProps {
  name: string;
  onNameChange: (name: string) => void;
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  requestState: Loadable;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  name,
  onNameChange,
  email,
  onEmailChange,
  onSubmit,
  requestState,
}) => {
  return (
    <div className="LoginForm">
      <div className="LoginForm__frame">
        <div className="LoginForm__title">LOGIN</div>
        <Field
          name="name"
          value={name}
          onChange={onNameChange}
          label="Name"
          className="LoginForm__field"
        />
        <Field
          name="email"
          value={email}
          onChange={onEmailChange}
          label="Email"
          className="LoginForm__field"
        />
        <div className="LoginForm__controls">
          <Button
            onClick={onSubmit}
            className="LoginForm__submit"
            disabled={isLoading(requestState)}
          >
            GO
          </Button>
        </div>
      </div>
    </div>
  );
};
