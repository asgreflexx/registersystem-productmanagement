import { ProductDto } from './product';

export class Pageable {
    pageNumber: number;
}

export class ProductWrapper {
    content: ProductDto[];
    totalPages : number;
    pageable : Pageable;  
}