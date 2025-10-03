function Pagination({ currentPage, onPageChange, pages }) {
  return (
    <div className="pagination" style={{ marginTop: '20px' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`paginator__numbers ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
