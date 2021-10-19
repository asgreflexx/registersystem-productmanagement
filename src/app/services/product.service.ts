import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductDto } from "../domain/product";
import { ProductWrapper } from "../domain/product-wrapper";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly BASE_URL = 'http://85.235.66.255:8080/product/';
  private readonly ALL_PRODUCTS_URL = this.BASE_URL + 'all';


  constructor(private http: HttpClient) { }

  getAllProducts(productName = "", sortArr = [], page = 0): Observable<ProductWrapper> {
    const x = this.http.get<ProductWrapper>(this.ALL_PRODUCTS_URL, { params: { size: "5", page: page.toString(), sort: sortArr, name: productName } });
    return x;
  }

  deleteProduct(id: string) {
    return this.http.delete(this.BASE_URL + id);
  }

  addProduct(product: ProductDto) {
    return this.http.post(this.BASE_URL, product);
  }

  /*
  private handleError(err: HttpErrorResponse): Observable<never> {        
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {         
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {          
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
    */

}
