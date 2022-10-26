import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { mapLoadable } from "../store/Loadable";
import { registerAction, useAppDispatch, useAppSelector } from "../store/store";

export const LoginPage: React.FC = () => {
  const [name, setName] = useState("abc");
  const [email, setEmail] = useState("my@mail.com");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector(state => mapLoadable(state.authStatus, () => null))

  const loginAction = useCallback(() => {
    dispatch(
      registerAction({
        email,
        name,
        onSuccess: () => {
          navigate("/posts");
        },
      })
    );
  }, [name, email, navigate, dispatch]);

  return (
    <LoginForm
      name={name}
      onNameChange={setName}
      email={email}
      onEmailChange={setEmail}
      onSubmit={loginAction}
      requestState={authState}
    />
  );
};
