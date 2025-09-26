import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function NewArticle({ user }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!user) return <p>Загрузка...</p>;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        'https://realworld.habsida.net/api/articles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
          },
          body: JSON.stringify({ article: data }),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        console.log('Ошибка сервера:', result);
        return;
      }

      navigate('/');
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="article-page">
        <div className="page">
          <label>
            Заголовок
            <input
              className="new-article article-page__title"
              {...register('title', { required: true })}
            />
          </label>
          <label>
            Описание
            <input
              className="new-article article-page__description"
              {...register('description', { required: true })}
            />
          </label>
          <label>
            Содержание текста
            <textarea
              className="new-article article-page__body"
              {...register('body', { required: true })}
            />
          </label>

          <button type="submit">Сохранить</button>
        </div>
      </div>
    </form>
  );
}
export default NewArticle;
