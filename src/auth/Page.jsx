import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Page({ setUser }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        'https://realworld.habsida.net/api/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: data }),
        },
      );

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        const text = contentType && contentType.includes('application/json')
          ? await response.json()
          : await response.text();
        console.log('Ошибка сервера:', text);
        return;
      }

      const result = await response.json();
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/');
    } catch (err) {
      console.log('Сетевая или другая ошибка:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="author">
      <input
        {...register('username', { required: true, minLength: 3 })}
        placeholder="Имя пользователя"
      />
      {errors.username && <span>Имя должно быть от 3 до 20 символов</span>}

      <input
        type="email"
        {...register('email', {
          required: true,
          pattern: /^[^@]+@[^@]+\.[^@]+$/,
        })}
        placeholder="Email"
      />
      {errors.email && <span>Неверный email</span>}

      <input
        type="password"
        {...register('password', { required: true, minLength: 6 })}
        placeholder="Пароль"
      />
      {errors.password && <span>Пароль 6-40 символов</span>}

      <button type="submit">Войти</button>
    </form>
  );
}

export default Page;
