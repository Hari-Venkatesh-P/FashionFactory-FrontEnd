import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  orderDetailsList :  Array<any> = []

  constructor(private cartService:CartService) { }

  ngOnInit(): void {

    this.getOrderDetailsById()
  }

  getOrderDetailsById(){
    try {
      this.cartService.getOrderDetails().subscribe((data:any)=>{
        if(data.success)
        {
          this.orderDetailsList = data.message;
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log("Error in getting the order details")
    }
  }

}
