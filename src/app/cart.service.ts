import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { config } from '../config/config';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient :HttpClient) { }

  public getShoppingCartDetails()
  {
    return this.httpClient.get(config.URL+`cart/${sessionStorage.getItem('user')}`);
  }
  public orderItemsFromCart(reqBody)
  {
    return this.httpClient.put(config.URL+`cart/`,reqBody);
  }

  public getOrderDetails()
  {
    return this.httpClient.get(config.URL+`cart/orders/${sessionStorage.getItem('user')}`);
  }
  public getOverAllOrderDetails()
  {
    return this.httpClient.get(config.URL+`cart/orders/forall`);
  }
}
