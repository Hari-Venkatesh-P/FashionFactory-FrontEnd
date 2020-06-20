import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userid : String 
  name : String
  email :String  
  address : String 
  mobile :String 
  password : String 

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')){
        this.getUserDetails();
    }

  }


  getUserDetails(){
    try {
      this.userService.getUserDetails().subscribe((data:any)=>{
        if(data.success)
        {
          this.userid = data.message._id
          this.name = data.message.name
          this.address = data.message.address
          this.email = data.message.email
          this.mobile = data.message.mobile
          this.password = data.message.password
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateDetails(){
    try {
      const reqBody = {
        id:sessionStorage.getItem('user'),
        mobile:this.mobile,
        address:this.address
      }
      this.userService.updateUserDetails(reqBody).subscribe((data:any)=>{
        if(data.success)
        {
            alert("Details edited successfully")
            window.location.reload()
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }



}
