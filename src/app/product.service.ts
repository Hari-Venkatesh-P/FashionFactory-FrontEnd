import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient :HttpClient) { }

  public getProductsBasedonFilters(catId:String,subcatId:String)
  {
    return this.httpClient.get(`http://localhost:4000/product/${catId}/${subcatId}`);
  }

  public getProductById(productId:String)
  {
    return this.httpClient.get(`http://localhost:4000/product/${productId}`);
  }

  public addProduct(reqBody:FormData)
  {
    return this.httpClient.post(`http://localhost:4000/product/`,reqBody);
  }

  public updateProduct(reqBody:any,id:String)
  {
    return this.httpClient.put(`http://localhost:4000/product/${id}`,reqBody);
  }

  public deleteProduct(id:String)
  {
    return this.httpClient.delete(`http://localhost:4000/product/${id}`);
  }

  public addProductToCart(reqBody:any)
  {
    console.log(reqBody)
    return this.httpClient.post(`http://localhost:4000/cart/`,reqBody);
  }
}
