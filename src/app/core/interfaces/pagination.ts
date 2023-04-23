export interface IPagination<T> {
  data: T[];
  scrollId: string | undefined;
}
