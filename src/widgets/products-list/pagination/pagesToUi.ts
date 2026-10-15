

export function pagesToUi(currentPage: number, totalPages: number): number[] {

    if (currentPage === 1) {
        return [currentPage, currentPage + 1, currentPage + 2];
    };

    if (currentPage === totalPages) {
        return [currentPage - 2, currentPage - 1, currentPage];
    };

    return [currentPage - 1, currentPage, currentPage + 1];

};