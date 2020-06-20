import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categorylist : Array<any> = []

  viewFlag:Array<Boolean>=[]

  searchFlag :Boolean = false;
  constructor(private categoryservice:CategoryService,private  router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  toggleHomeView(i){
    if(this.viewFlag[i]){
      this.viewFlag[i] =false
    }else{
      this.viewFlag[i] =true
    }
  }

  getAllCategories(){
    try{
      this.categoryservice.getAllCategories().subscribe((data:any)=>{
        if(data.success)
        {
          this.categorylist = data.message;
          this.viewFlag.length +=parseInt(data.message.length)
          this.viewFlag.fill(false)
        }
      })
    }catch(err){
      console.log("Problem in retrieving the details of the all categories")
    }
  }


  displayProducts(categoryId,subcategoryId){
    this.router.navigate(['/home'], { queryParams: { categoryId: categoryId,subcategoryId : subcategoryId } })
  }

  toggleSearch(){
    this.searchFlag = !this.searchFlag
  }

  isAdminLoggedIn(){
    return this.userService.isAdminLoggedIn()
  }

  displayWhatsNewProducts(){
    this.router.navigate(['/home'], { queryParams: { newProduct: 'newProduct'} })
  }
}
