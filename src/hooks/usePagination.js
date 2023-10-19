import { useMemo } from "react";

export const usePagination = (totalPages) => {
  const paginationData = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  return { paginationData };
};

// export const getPagesArray = (totalPages) => {
//   let result = [];
//   for (let i = 0; i < totalPages; i++) {
//     result.push(i + 1);
//   }
//   return result;
// };
