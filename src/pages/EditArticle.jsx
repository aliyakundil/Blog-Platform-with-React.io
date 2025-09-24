import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditArticle({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
    },
  });

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        body: article.body,
      });
    }
  }, [article, reset]);

  if (!article) return <p>Загрузка статьи...</p>; // Ждем article

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://realworld.habsida.net/api/articles/${article.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({ article: data }),
      });

      // const text = await response.text();
      // const result = text ? JSON.parse(text) : {};

      const result = await response.json();

      if (!response.ok) {
        console.log('Ошибка сервера:', result);
        return;
      }

      navigate(`/articles/${result.article.slug}`);
    } catch (err) {
      console.log('Сетевая ошибка или некорректный JSON:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="article-page">
        <div className="page">
          <label>
            Заголовок
            <input className="new-article article-page__title" {...register('title', { required: true })} />
          </label>
          <label>
            Описание
            <input className="new-article article-page__description" {...register('description', { required: true })} />
          </label>
          <label>
            Содержание текста
            <textarea className="new-article article-page__body" {...register('body', { required: true })} />
          </label>

          <button type="submit">Сохранить</button>
        </div>
      </div>
    </form>
  );
}

export default EditArticle;
