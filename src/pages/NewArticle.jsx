import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function NewArticle({ user }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  if (!user) {
    return (
      <div className="article-page__spin">
        <i className="bx bx-revision spin" />
        <div className="article-loading">Loading</div>
      </div>
    );
  }

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
        <div className="sign">
          <input
            className="new-article"
            placeholder="Title"
            {...register('title', { required: true })}
          />
          <input
            className="new-article"
            placeholder="Short description"
            {...register('description', { required: true })}
          />
          <textarea
            className="new-article"
            placeholder="Input your text"
            {...register('body', { required: true })}
          />

          <button type="submit" className="btn-sign">
            Publish Article
          </button>
        </div>
      </div>
    </form>
  );
}
export default NewArticle;
