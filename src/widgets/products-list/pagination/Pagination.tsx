import Link from "next/link";
import style from "./pagination.module.scss";
import { pagesToUi } from "./lib/pagesToUi";
import { buildCatalogHref } from "./lib/buildCatalogHref";

export default function Pagination({
  currentPage,
  totalPages,
  sort
}: {
  currentPage: number;
  totalPages: number;
  sort?: string
}) {
  const visiblePageButtons = pagesToUi(currentPage, totalPages);

  return (
    <div className={style.paginationContainer}>
      {currentPage > 1 && (
        <Link
          href={buildCatalogHref(currentPage - 1, sort)}
          aria-label="Previous page"
          className={`${style.pagesBtn} ${style.pageBtnLeft}`}
        ></Link>
      )}

      <ul className={style.pagesList}>
        {visiblePageButtons.map((visibleButton) => (
          <li key={visibleButton}>
            <Link
              href={buildCatalogHref(visibleButton, sort)}
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
          href={buildCatalogHref(currentPage + 1, sort)}
          aria-label="Next page"
          className={`${style.pagesBtn} ${style.pageBtnRight}`}
        ></Link>
      )}
    </div>
  );
}


