interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <div className="join">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <input
            key={page}
            className={`join-item btn btn-square ${currentPage === page ? 'btn-active' : ''}`}
            type="radio"
            name="options"
            aria-label={`${page}`}
            checked={currentPage === page}
            onChange={() => onPageChange(page)}
          />
        ))}
      </div>
    );
  }
  