import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(private cartService:CartService) { }
  productId:String
  cartDetailsList :  Array<any> = []
  displayFlag : Boolean = false

  ngOnInit(): void {
      this.getShoppingCartDetailsById()
  }

  getShoppingCartDetailsById(){
    try {
      this.cartService.getShoppingCartDetails().subscribe((data:any)=>{
        if(data.success)
        {
          this.cartDetailsList = data.message;
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log("Error in getting the shopping details")
    }
  }
  setCurrentItemId(id){
    this.productId=id
  }
  orderItemsFromCart(){
    var answer = confirm ("Confirm to place Order ?")
    if (answer){
      try {
        const reqBody = {
          productId: this.productId,
          userId : sessionStorage.getItem('user'),
          paymentStatus : this.displayFlag,
        }
        this.cartService.orderItemsFromCart(reqBody).subscribe((data:any)=>{
          if(data.success)
          {
            alert("Order Placed")
            window.location.reload()
          }else{
              console.log(data.message)
          }
        })
      } catch (error) {
        
      }
    }
  }

  setPaymentStatus(value){
    if(value==='card'){
      this.displayFlag = true
    }else{
      this.displayFlag = false
    }
  }
}
