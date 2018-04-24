export type TCollectionPagination = {
  limit: number,
  total: number,
  page: number,
  pagesCount: number,
};

export type TCollectionOrdering = {
  sortBy?: string,
  reverse?: boolean,
};

export type TCollectionFilters = {
  [field: string]: any,
};

export interface ICollection<T> {
  items: T;
}

export interface ICollectionWithPagination {
  pagination: TCollectionPagination;
}

export interface ICollectionWithOrdering {
  ordering: TCollectionOrdering;
}

export interface ICollectionWithFilters {
  filters: TCollectionFilters;
}
