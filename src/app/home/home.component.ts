import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private apiService: ApiService,
    private productsService: ProductsService
  ) { }

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];
  totalRecors: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toogleEditPopup(product: Product){
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toogleDeletePopup(product: Product){
    if (!product.id) return;
    this.deleteProduct(product.id);
  }

  toogleAddPopup(){
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    name: '',
    price: '',
    image: '',
    rating: 0,
    id: 0
  };

  
  ngOnInit(){
    this.fetchProducts(0, this.rows);
  }

  onConfirmEdit(product: Product){
    if (!this.selectedProduct.id) return;
    this.editProduct(product, this.selectedProduct.id ?? 0);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product){
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product){
    console.log(product,'Output');
  }

  fetchProducts(page:number, perPage: number){
    this.productsService
    .getProducts('http://localhost:3000/clothes', {page:page, perPage:perPage})
      .subscribe({
        next: (response: Products) => {
          this.products = response.items;
          this.totalRecors = response.total;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator(){
    this.paginator?.changePage(0);
  }
  
  editProduct(product: Product, id:number){
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  deleteProduct(id:number){
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
      }
      }
    );
  }

  addProduct(product: Product){
    this.productsService.addProduct('http://localhost:3000/clothes', product).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}

