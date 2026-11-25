interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}



const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }

  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }

  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={page === 1}>
        Anterior
      </button>
      <span>
      
        Página {page} de {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Siguiente
      </button>
    </div>
  );
}