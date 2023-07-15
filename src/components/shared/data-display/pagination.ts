export interface PaginationProps<T> {
    page: number;
    pageCount: number;
    itemsPerPage: number;
    pageTabCount: number;
    data: T[];
    onChange: (page: number) => void;
}