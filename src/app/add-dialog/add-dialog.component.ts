import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductDto } from '../domain/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  errorProductMessage: ProductDto;
  errorMessage = '';
  product: ProductDto;
  constructor(private service: ProductService, private dialogRef: MatDialogRef<AddDialogComponent>) { }

  ngOnInit(): void {
    this.product = {
      "amount": 0,
      "code": '',
      "name": '',
      price: 0
    };
  }

  onSubmit() {
    this.service.addProduct(this.product).subscribe(
      data => this.dialogRef.close("true"),
      error => this.handleError(error)
    );
  }

  setName(name: string) {
    this.product.name = name;
  }

  setCode(code: string) {
    this.product.code = code;
  }

  setPrice(price: number) {
    this.product.price = price;
  }

  setAmount(amount: number) {
    this.product.amount = amount;
  }


  setType(type: string) {
    this.product.foodType = type;
  }

  handleError(errorResponse: any) {
    this.errorProductMessage = (errorResponse.error);
    this.setErrorMessage();
  }

  setErrorMessage() {
    var msg = this.errorProductMessage.name ? "Name " + this.errorProductMessage.name + '\n' : "";
    msg += this.errorProductMessage.price ? "Price " + this.errorProductMessage.price + '\n' : "";
    msg += this.errorProductMessage.code ? "Code " + this.errorProductMessage.code + '\n': "";
    msg += this.errorProductMessage.code ? "Food Typ " + this.errorProductMessage.foodType + '\n': "";
    this.errorMessage = msg;
    
  }

}
