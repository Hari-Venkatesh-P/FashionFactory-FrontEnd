import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { config } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient :HttpClient) { }

  public getProductsBasedonFilters(catId:String,subcatId:String)
  {
    return this.httpClient.get(config.URL+`product/${catId}/${subcatId}`);
  }

  public getProductById(productId:String)
  {
    return this.httpClient.get(`product/${productId}`);
  }

  public getLatestProducts()
  {
    return this.httpClient.get(config.URL+`product/new`);
  }

  public addProduct(reqBody:FormData)
  {
    return this.httpClient.post(config.URL+`product/`,reqBody);
  }

  public updateProduct(reqBody:any,id:String)
  {
    return this.httpClient.put(config.URL+`product/${id}`,reqBody);
  }

  public deleteProduct(id:String)
  {
    return this.httpClient.delete(config.URL+`product/${id}`);
  }

  public addProductToCart(reqBody:any)
  {
    console.log(reqBody)
    return this.httpClient.post(config.URL+`cart/`,reqBody);
  }
}
