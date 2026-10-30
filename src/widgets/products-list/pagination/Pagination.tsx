import Link from "next/link";
import style from "./pagination.module.scss";
import { pagesToUi } from "./lib/pagesToUi";
import { buildCatalogHref } from "./lib/buildCatalogHref";
import { CatalogQuery } from "@entities/product/model/types";

export default function Pagination({
  totalPages,
  catalogQuery
}: {
  totalPages: number;
  catalogQuery: CatalogQuery
}) {
  const {page, sort} = catalogQuery;

  const visiblePageButtons = pagesToUi(page, totalPages);

  return (
    <div className={style.paginationContainer}>
      {page > 1 && (
        <Link
          href={buildCatalogHref(page - 1, sort)}
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
                ${visibleButton === page ? style.active : ""}`}
            >
              {visibleButton}
            </Link>
          </li>
        ))}
      </ul>

      {page < totalPages && (
        <Link
          href={buildCatalogHref(page + 1, sort)}
          aria-label="Next page"
          className={`${style.pagesBtn} ${style.pageBtnRight}`}
        ></Link>
      )}
    </div>
  );
}


