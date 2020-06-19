import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categorylist : Array<any> = []

  viewFlag:Array<Boolean>=[]


  constructor(private categoryservice:CategoryService,private  router:Router) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  toggleHomeView(i){
    if(this.viewFlag[i]){
      this.viewFlag[i] =false
    }else{
      this.viewFlag.fill(false)
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
          console.log(this.viewFlag)
        }else{
            console.log(data.message)
        }
      })
    }catch(err){
      console.log("Problem in retrieving the details of the all categories")
    }
  }


  displayProducts(categoryId,subcategoryId){
    console.log(categoryId,subcategoryId)
    this.router.navigate(['/home'], { queryParams: { categoryId: categoryId,subcategoryId : subcategoryId } })
  }

}
