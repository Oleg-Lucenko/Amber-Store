
export const pageSize = 6;

export const skip = (pageNumber: number) => {
   return (pageNumber - 1) * pageSize;
};
