import { useState, useEffect } from 'react';

const API_URL = 'https://realworld.habsida.net/api/tags';

function PopularTags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (!data.tags) return;
        const listTags = data.tags.slice(0, 6);
        setTags(listTags);
      })
      .catch((err) => console.error('Ошибка загрузки', err));
  }, []);

  return (
    <div className="articles-tags">
      <div className="tags-title">Popular tags</div>
      <div className="popular-tag">
        {tags.map(
          (tag) => tag && (
          <p key={tag} className="page-tag">
            {tag}
          </p>
          ),
        )}
      </div>
    </div>
  );
}

export default PopularTags;
