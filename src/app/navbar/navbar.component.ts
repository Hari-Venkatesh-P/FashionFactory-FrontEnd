import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorylist: Array<any> = []
  show: Boolean = false
  viewFlag:Array<Boolean>=[]
  categoryId : String
  subcategoryId : String 
  constructor(private categoryservice:CategoryService,private  router:Router) { }
  ngOnInit() {
    this.getAllCategories()
  }
  toggleSideBar() {
    this.show = !this.show
  }
  toggleHomeView(i){
    this.viewFlag.fill(false)
    this.viewFlag[i] =true
    console.log(this.viewFlag)
  }

  getAllCategories()
  {
    this.categoryservice.getAllCategories().subscribe((data:any)=>{
      if(data.success)
      {
        this.categorylist = data.message;
        this.viewFlag.length +=parseInt(data.message.length)
        this.viewFlag.fill(false)
        console.log(this.viewFlag)
      }else{
          console.log(data.message)
      }
    })
  }

  displayProducts(catId:String,subcatId:String){
    console.log(catId,subcatId);
    this.router.navigate(['/home'], { queryParams: { categoryId: catId,subcategoryId: subcatId } })
  }

  userLogin(){
    console.log("Hello from user")
      this.router.navigate(['/login']);
  }

}
