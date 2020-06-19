import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient :HttpClient) { }

  public getShoppingCartDetails()
  {
    return this.httpClient.get(`http://localhost:4000/cart/${sessionStorage.getItem('user')}`);
  }
  public orderItemsFromCart(reqBody)
  {
    return this.httpClient.put(`http://localhost:4000/cart/`,reqBody);
  }

  public getOrderDetails()
  {
    return this.httpClient.get(`http://localhost:4000/cart/orders/${sessionStorage.getItem('user')}`);
  }
}
