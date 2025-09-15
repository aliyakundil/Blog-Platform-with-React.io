import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
// import { registerUser } from "../services/auth";

function Register({ setUser }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await registerUser(data); // API вызов
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      console.log(err.response.data); // Обработка ошибок сервера
    }
  };

  return (
    <AuthForm
      register={register}
      errors={errors}
      watch={watch}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default Register;
