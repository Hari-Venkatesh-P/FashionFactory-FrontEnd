import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  orderDetailsList :  Array<any> = []

  alertFlag : Boolean = false

  alertContent : String = ''

  constructor(private cartService:CartService,private userService :UserService) { }

  ngOnInit(): void {
    if(this.userService.isUserLoggedIn()){
      this.getOrderDetailsById()
    }else if(this.isAdminLoggedIn){
      this.getOverAllOrderDetails()
    }
  }

  getOrderDetailsById(){
    try {
      this.cartService.getOrderDetails().subscribe((data:any)=>{
        if(data.success)
        {
          this.orderDetailsList = data.message;
          if(this.orderDetailsList.length==0){
            this.alertFlag = true
            this.alertContent = "You have not placed any orders ..! :("
          }else{
            this.alertFlag = false
          }
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log("Error in getting the order details")
    }
  }

  
  getOverAllOrderDetails(){
    try {
      this.cartService.getOverAllOrderDetails().subscribe((data:any)=>{
        if(data.success)
        {
          this.orderDetailsList = data.message;
          console.log(this.orderDetailsList )
          if(this.orderDetailsList.length==0){
            this.alertFlag = true
            this.alertContent = "Customers not placed any orders .. :("
          }else{
            this.alertFlag = false
          }
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log("Error in getting the order details")
    }
  }

  isAdminLoggedIn(){
    return this.userService.isAdminLoggedIn()
  }

  isUserLoggenIn(){
    return this.userService.isUserLoggedIn()

  }


}
