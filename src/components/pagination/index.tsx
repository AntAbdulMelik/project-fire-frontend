import { ellipsis } from "assets/media";
import PerPageSelector from "components/selectors/PerPageSelector";
import PageNumberButton from "components/pagination/PageNumberButton";

type Props = {
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  items: string;
  handlePerPageSelection: (perPage: number) => void;
  handlePageChange: (pageNumber: number) => void;
};

const Pagination = ({
  total,
  currentPage,
  lastPage,
  perPage,
  items,
  handlePerPageSelection,
  handlePageChange,
}: Props) => {
  const pageNumbers = Array.from({ length: lastPage }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-between">
      <div className="hidden items-center gap-7 sm:flex">
        <div className="flex items-center gap-[9px]">
          <span className="font-opensans-semi-bold text-sm font-semibold leading-[30px] tracking-[0.15px] text-nightfall-navy">
            Rows per page:
          </span>
          <PerPageSelector
            perPage={perPage}
            handlePerPageSelection={handlePerPageSelection}
          />
        </div>
        <span className="font-opensans-semi-bold text-sm font-semibold leading-[30px] tracking-[0.15px] text-whispering-gray">
          {total === 0 ? 0 : (currentPage - 1) * perPage + 1}
          {" - "}
          {currentPage * perPage < total ? currentPage * perPage : total}
          {" of "}
          {total} {items}
        </span>
      </div>
      <div className="flex gap-2">
        {currentPage > 1 && (
          <div className="hidden sm:flex">
            <PageNumberButton
              key="prev"
              pageNumber="Previous"
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
            />
          </div>
        )}
        {pageNumbers.map((pageNumber) => {
          if (total > 4 && currentPage <= 3) {
            if (pageNumber <= 3 || pageNumber === lastPage) {
              return (
                <PageNumberButton
                  key={pageNumber}
                  pageNumber={pageNumber}
                  isActive={currentPage === pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                />
              );
            } else if (pageNumber === lastPage - 1) {
              return (
                <div className="flex h-8 w-8 items-center justify-center">
                  <img src={ellipsis} />
                </div>
              );
            } else return null;
          }
          if (total > 4 && currentPage >= lastPage - 2) {
            if (pageNumber === 1 || pageNumber >= lastPage - 2) {
              return (
                <PageNumberButton
                  key={pageNumber}
                  pageNumber={pageNumber}
                  isActive={currentPage === pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                />
              );
            } else if (pageNumber === 2) {
              return (
                <div className="flex h-8 w-8 items-center justify-center">
                  <img src={ellipsis} />
                </div>
              );
            } else return null;
          }
          if (total > 4 && currentPage > 3 && currentPage < lastPage - 2) {
            if (
              pageNumber === 1 ||
              pageNumber === lastPage ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PageNumberButton
                  key={pageNumber}
                  pageNumber={pageNumber}
                  isActive={currentPage === pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                />
              );
            } else if (pageNumber === 2 || pageNumber === lastPage - 1) {
              return (
                <div className="flex h-8 w-8 items-center justify-center">
                  <img src={ellipsis} />
                </div>
              );
            } else return null;
          }
          return (
            <PageNumberButton
              key={pageNumber}
              pageNumber={pageNumber}
              isActive={currentPage === pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            />
          );
        })}
        {currentPage < lastPage && (
          <div className="hidden sm:flex">
            <PageNumberButton
              key="next"
              pageNumber="Next"
              onClick={() =>
                handlePageChange(
                  currentPage < lastPage ? currentPage + 1 : lastPage
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
