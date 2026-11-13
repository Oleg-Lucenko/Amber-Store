export function pagesToUi(currentPage: number, totalPages: number): number[] {
  if (totalPages < 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage === 1) {
    return [1, 2, 3];
  }

  if (currentPage === totalPages) {
    return [currentPage - 2, currentPage - 1, currentPage];
  }

  return [currentPage - 1, currentPage, currentPage + 1];
}
