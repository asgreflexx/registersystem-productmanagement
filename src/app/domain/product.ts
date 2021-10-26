export class ProductDto {
    id?: string;
    name: string;
    code: string;
    foodType?: string;
    amount: number;
    price: number;
}

export class ProductErrorResponse extends ProductDto {
    message : string;
}