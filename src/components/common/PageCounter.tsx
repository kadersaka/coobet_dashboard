import { FC } from "react";

interface PageCounterProps {
  totalPage: number;
  currentPage: number;
  pageSize?: number;
  fetchPage: (page: number) => void;
}

const PageCounter: FC<PageCounterProps> = ({
  totalPage,
  currentPage,
  pageSize,
  fetchPage,
}) => {
  return (
    <div className="flex items-center text-boxdark dark:text-white ">
      {Array.from(
        { length: Math.ceil(totalPage / (pageSize ?? 10)) },
        (_, index) =>
          index + 1 == currentPage ? (
            <span
              key={index}
              className="mx-1.5 flex flex-1 items-center justify-center rounded-full bg-primary px-3 py-1 font-bold text-white
          "
            >
              {index + 1}
            </span>
          ) : (
            <span
              key={index}
              className="mx-1.5 flex-1 font-normal hover:cursor-pointer"
              onClick={() => fetchPage(index + 1)}
            >
              {index + 1}
            </span>
          ),
      )}
    </div>
  );
};

export default PageCounter;
