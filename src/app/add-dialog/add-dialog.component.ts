import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../domain/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  product : ProductDto;
  constructor(private service : ProductService) { }

  ngOnInit(): void {
    this.product = {
      "amount": 0,
      "code":'',
      "name":'',
      price: 0
     };
  }

  onSubmit(){
    console.log(this.product);
    this.service.addProduct(this.product).subscribe(data => console.log (data));
  }

  setName(name: string){
    this.product.name = name;
  }

  setCode (code : string){
    this.product.code = code;
  }

  setPrice(price: number){
    this.product.price = price;
  }

  setAmount(amount: number){
    this.product.amount = amount;
  }

  
  setType(type: string){
    this.product.foodType = type;
  }

}
