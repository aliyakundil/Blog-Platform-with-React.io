import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function EditArticle({ user }) {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!location.state?.article);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
    },
  });

  useEffect(() => {
    if (!article) {
      const fetchArticle = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `https://realworld.habsida.net/api/articles/${slug}`,
          );
          if (!res.ok) throw new Error('Ошибка загрузки статьи');
          const data = await res.json();
          setArticle(data.article);
          reset({
            title: data.article.title,
            description: data.article.description,
            body: data.article.body,
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    } else {
      reset({
        title: article.title,
        description: article.description,
        body: article.body,
      });
    }
  }, [article, slug, reset]);

  if (!article) {
    return (
      <div className="article-page__spin">
        <i className="bx bx-revision spin" />
        <div className="article-loading">Loading</div>
      </div>
    );
  } // Ждем article

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
          },
          body: JSON.stringify({ article: data }),
        },
      );

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

  const handleAddFavoriteArticle = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="article-page">
        <div className="page">
          <label htmlFor="title">
            Title
            <input
              id="tite"
              className="new-article article-page__title"
              {...register('title', { required: true })}
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              id="description"
              className="new-article article-page__description"
              {...register('description', { required: true })}
            />
          </label>
          <label htmlFor="content">
            Content
            <textarea
              id="content"
              className="new-article article-page__body"
              {...register('content', { required: true })}
            />
          </label>

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}

export default EditArticle;
