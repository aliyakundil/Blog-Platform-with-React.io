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
        username: user.username || 'Username',
        email: user.email || 'Email Adsress',
        image: user.image || 'Avatar image (URL)',
        password: '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    if (!user) return;

    const payload = {
      username: data.username.trim() || '',
      email: data.email.trim() || '',
      password: data.password?.trim() || '',
      image: data.image?.trim() || '',
    };

    // Добавляем только если что-то введено

    if (data.password?.trim()) payload.password = data.password.trim();
    if (data.image?.trim()) payload.image = data.image.trim();

    const body = JSON.stringify(payload);

    console.log('Отправляем payload:', payload);
    console.log(JSON.stringify({ user: payload }));
    console.log('FINAL BODY:', JSON.stringify({ user: payload }));

    try {
      const response = await fetch('https://realworld.habsida.net/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body,
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

  if (!user) {
    return (
      <div className="article-page__spin">
        <i className="bx bx-revision spin" />
        <div className="article-loading">Loading</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="author">
      <div className="sign">
        <div className="title">
          <h3>Your Settings</h3>
        </div>
        <input
          {...register('username', { required: true })}
          placeholder="Username"
        />
        {errors.username && <span>Name is required</span>}

        <input
          {...register('email', { required: true })}
          placeholder="Email address"
        />
        {errors.email && <span>Email is required</span>}

        <input
          type="password"
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          placeholder="Password"
        />
        {errors.password && <span>Password must be 6–40 characters</span>}

        <input
          {...register('image', {
            validate: (value) => {
              if (!value) return true; // пустое поле разрешаем
              try {
                new URL(value); // если new URL не упадёт → значит строка валидный URL
                return true;
              } catch {
                return 'Ссылка должна быть корректным URL';
              }
            },
          })}
          placeholder="Avatar image (URL)"
        />
        {errors.password && <span>Avatar image must be a valid URL</span>}

        <button type="submit" className="btn-sign">
          Update Settings
        </button>
        <button
          type="button"
          className="btn-logout"
          onClick={() => {
            localStorage.removeItem('user');
            // window.location.reload();
            setUser(null); // очищаем состояние пользователя
            navigate('/'); // перенаправляем на главную
          }}
        >
          Or click here to logout
        </button>
      </div>
    </form>
  );
}

export default Profile;
