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
}
