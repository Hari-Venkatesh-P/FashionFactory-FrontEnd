import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productlist : Array<any> = []

  constructor(private  router:Router,private activatedRouter: ActivatedRoute,private productservice:ProductService) { }

  ngOnInit(): void {
    console.log("Hello From Home")
    
    this.activatedRouter.queryParams.subscribe((params) => {
      console.log(params)
      if (params.categoryId && params.subcategoryId) {
        console.log(params.categoryId , params.subcategoryId)
      } else {
        console.log("no change in params")

      }
    })

    this.activatedRouter.queryParams.subscribe((params) => {
      if (params.categoryId) {
        console.log("Hello From Home inside params")
        console.log(params.categoryId,params.subcategoryId)
        this.getProductsBasedonFilters(params.categoryId,params.subcategoryId)
      } else {
        //this.getLatestProducts()
      }
    })
  }

  getProductsBasedonFilters(catId,subCatId){
    this.productservice.getProductsBasedonFilters(catId,subCatId).subscribe((data:any)=>{
      if(data.success)
      {
        this.productlist = data.message;
        console.log(this.productlist)
      }else{
          console.log(data.message)
      }
    })
  }

}
