import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Profile({ user, setUser }) {
  const navigate = useNavigate();

  // Всегда инициализируем useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      image: '',
    },
  });

  // Когда user загружается, обновляем значения формы
  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        image: user.image || '',
        password: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    if (!user) return;

    const payload = {
      username: String(data.username).trim(),
      email: String(data.email).trim(),
    };

    // Добавляем только если что-то введено
    if (data.password && data.password.trim() !== '') payload.password = String(data.password).trim();
    if (data.image && data.image.trim() !== '') payload.image = String(data.image).trim();

    console.log('Отправляем payload:', payload);

    try {
      const response = await fetch('https://realworld.habsida.net/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({ user: payload }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log('Ошибка сервера:', result);
        return;
      }

      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/');
    } catch (err) {
      console.log('Сетевая ошибка:', err.message);
    }
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="author">
      <input
        {...register('username', { required: true })}
        placeholder="Имя пользователя"
      />
      {errors.username && <span>Имя обязательно</span>}

      <input {...register('email', { required: true })} placeholder="Email" />
      {errors.email && <span>Email обязателен</span>}

      <input {...register('password')} type="password" placeholder="Пароль" />

      <input {...register('image')} placeholder="Изображение" />

      <button type="submit">Сохранить</button>
    </form>
  );
}

export default Profile;
