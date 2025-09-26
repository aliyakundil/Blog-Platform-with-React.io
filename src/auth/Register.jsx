import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import Page from './Page';
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
      const response = await fetch('https://realworld.habsida.net/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Ошибка сервера:', errorData);
        return;
      }

      const result = await response.json();
      setUser(result.user); // сохраняем пользователя
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/'); // автоматический вход
    } catch (err) {
      if (err.errors && err.errors.body) {
        // выводим ошибки, которые пришли с сервера
        console.log('Ошибки сервера:', err.errors.body.join(', '));
      } else {
        console.log('Другая ошибка:', err.message);
      }
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
