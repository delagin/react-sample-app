import { TCollectionOrdering, TCollectionPagination } from '@common/core/types';

// tslint:disable-next-line export-name
export const createPagination = (limit: number, page: number, total: number): TCollectionPagination => {
  const pagesCount: number = Math.ceil(total / limit);

  return {
    limit,
    pagesCount,
    page,
    total,
  };
};

export const orderingToArray = (ordering: TCollectionOrdering): Object | null => {
  if (ordering.sortBy && ordering.sortBy !== '') {
    return [
      ordering.sortBy,
      (ordering.reverse ? true : false),
    ];
  }

  return null;
};
