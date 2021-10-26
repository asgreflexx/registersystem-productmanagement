import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDto, ProductErrorResponse } from '../domain/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  errorProductMessage: ProductErrorResponse;
  errorMessage = '';
  product: ProductDto;
  constructor(
    private service: ProductService, 
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editProduct: ProductDto
    ) { }

  ngOnInit(): void {
    this.product = {
      id : '',
      name: '',
      price: 0,
      code: '',
      amount: 0,
      foodType: ''
    };
    if (this.editProduct)
      this.copyProduct();
  }

  copyProduct () {    
      this.product.id = this.editProduct.id;
      this.product.name = this.editProduct.name;
      this.product.price = this.editProduct.price;
      this.product.code = this.editProduct.code;
      this.product.amount = this.editProduct.amount;
      this.product.foodType = this.editProduct.foodType;      
  }

  onSubmit() {
    this.service.addProduct(this.product).subscribe(
      data => {        
        this.dialogRef.close("true");
      },
        error => this.handleError(error)
    );
  }

  handleError(errorResponse: any) {
    this.errorProductMessage = new ProductErrorResponse();
    this.errorProductMessage = (errorResponse.error);
    this.setErrorMessage();
  }

  setErrorMessage() {
    var msg = this.errorProductMessage.name ? "Name " + this.errorProductMessage.name + '\n' : "";
    msg += this.errorProductMessage.price ? "Price " + this.errorProductMessage.price + '\n' : "";
    msg += this.errorProductMessage.code ? "Code " + this.errorProductMessage.code + '\n': "";
    msg += this.errorProductMessage.foodType ? "Food Typ " + this.errorProductMessage.foodType + '\n': "";
    msg += this.errorProductMessage.message ? this.errorProductMessage.message : "";
    this.errorMessage = msg;    
  }
}
