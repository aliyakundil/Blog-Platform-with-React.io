import { useState } from "react";

function AuthForm({ register, errors, watch, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="author">
      <input
        {...register("username", {
          required: true,
          minLength: 3,
          maxLength: 20,
        })}
        placeholder="Имя пользователя"
      />
      {errors.username && <span>Имя должно быть от 3 до 20 символов</span>}

      <input
        {...register("email", {
          required: true,
          pattern: /^[^@]+@[^@]+\.[^@]+$/,
        })}
        placeholder="Email"
      />
      {errors.email && <span>Неверный email</span>}

      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: 6,
          maxLength: 40,
        })}
        placeholder="Пароль"
      />
      {errors.password && <span>Пароль 6-40 символов</span>}

      <input
        type="password"
        {...register("confirmPassword", {
          validate: (value) => value === watch("password"),
        })}
        placeholder="Подтвердите пароль"
      />
      {errors.confirmPassword && <span>Пароли не совпадают</span>}

      <label>
        <input type="checkbox" {...register("agreement", { required: true })} />{" "}
        Я принимаю условия
      </label>
      {errors.agreement && <span>Необходимо согласие</span>}

      <button type="submit">Регистрация</button>
    </form>
  );
}

export default AuthForm;
