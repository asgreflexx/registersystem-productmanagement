import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProductDto } from './domain/product';
import { ProductWrapper } from './domain/product-wrapper';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'productmanagement';
  productList: ProductDto[];
  productName = "";
  sortArray = [];
  currentPage = 0;
  totalPages = 0;
  page = 0;

  headerColumnName = new Map<string, string>();


  constructor(private service: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.initialzeMap();
    this.getAllProducts();

  }

  initialzeMap() {
    this.headerColumnName.set("name", "Product");
    this.headerColumnName.set("price", "Price");
    this.headerColumnName.set("amount", "Amount");
  }

  getAllProducts(event = null) {
    this.service.getAllProducts(this.productName, this.sortArray, this.page).subscribe(response => this.onAllProductsResponse(response));
  }

  onAllProductsResponse(response: ProductWrapper) {
    this.productList = response.content;
    this.currentPage = response.pageable.pageNumber;
    this.totalPages = response.totalPages;
    console.log("products", response);
  }

  amountClass(value: number): string {
    if (value > 30)
      return "amountEnough";
    if (value > 10)
      return "amountMiddle";
    return "amountLow";
  }

  deleteProduct(prod: ProductDto) {
    var dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        productName: prod.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        console.log("drinnen");
        this.service.deleteProduct(prod.id).subscribe(() =>
          this.getAllProducts()
        );
      }
    });
  }

  addProduct() {
    var dialogRef = this.dialog.open(AddDialogComponent, {
      disableClose: true,
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.getAllProducts();
      }
    });
  }

  sortData(fieldName) {
    var columnName = this.headerColumnName.get(fieldName);
    const sortField = this.sortArray.find(x => x.includes(fieldName));
    if (sortField == null || sortField == undefined) {
      this.sortArray.push(fieldName + ",asc");
      columnName = columnName + " +";
    }
    else {
      var index = this.sortArray.indexOf(sortField);
      if (sortField.includes("asc")) {
        this.sortArray[index] = fieldName + ",desc";
        columnName = columnName.replace(" +", " -");
      }
      else {
        this.sortArray.splice(index, 1);
        columnName = columnName.split(" ")[0];
      }
    }
    this.headerColumnName.set(fieldName, columnName);
    this.getAllProducts();

  }

  switchPage(pageNumber) {
    if (pageNumber <= 0) {
      this.page = 0;
    }
    else if (pageNumber >= this.totalPages) {
      this.page = this.totalPages - 1;
    }
    else {
      this.page = pageNumber;
    }
    this.getAllProducts();
  }

  classForPrev() : string {
    return "paging " + (this.currentPage == 0 ? "disabled" : "");
  }

  classForNext() : string {
    return "paging " + (this.currentPage == this.totalPages -1 ? "disabled" : "");
  }


}
