

export function buildCatalogHref(page: number, sort?: string) {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (sort !== undefined) {
    params.set("sort", sort);
  }

  return `?${params.toString()}`;
};
