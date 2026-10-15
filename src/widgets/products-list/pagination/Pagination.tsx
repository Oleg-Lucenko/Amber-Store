import Link from "next/link";
import style from "./pagination.module.scss";
import { pagesToUi } from "./pagesToUi";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const visiblePageButtons = pagesToUi(currentPage, totalPages);

  return (
    <div className={style.paginationContainer}>
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className={`${style.pagesBtn} ${style.pageBtnLeft}`}
        ></Link>
      )}

      <ul className={style.pagesList}>
        {visiblePageButtons.map((visibleButton) => (
          <li key={visibleButton}>
            <Link
              href={`?page=${visibleButton}`}
              className={`${style.pageLink}
                ${visibleButton === currentPage ? style.active : ""}`}
            >
              {visibleButton}
            </Link>
          </li>
        ))}
      </ul>

      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className={`${style.pagesBtn} ${style.pageBtnRight}`}
        ></Link>
      )}
    </div>
  );
}


