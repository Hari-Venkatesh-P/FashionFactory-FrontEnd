import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productlist : Array<any> = []
  categorylist : Array<any> = []
  subcategoryList : Array<any> = []
  productid = '';
  productname='';
  productavailableQuantity='';
  productcategoryId='';
  productcategoryName=''
  productdescription='';
  productprice='';
  productsubcategoryId='';
  productsubcategoryName='';
  defaultQuantity :Number = 1;
  paramsCatId : String ='';
  paramsSubCatId : String =''
  noProductFlag : Boolean = false;

  
  constructor(private  router:Router,private activatedRouter: ActivatedRoute,private productservice:ProductService,private categoryservice:CategoryService,private userService :UserService) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      console.log(params)
      if (params.categoryId && params.subcategoryId) {
        console.log(params.categoryId , params.subcategoryId)
        this.getProductsBasedonFilters(params.categoryId,params.subcategoryId);
      } else {
        console.log("no change in params")
      }
    })
    this.getAllCategories();
  }

  getProductsBasedonFilters(catId,subCatId){
    console.log("Getting getProductsBasedonFilters")
    this.productservice.getProductsBasedonFilters(catId,subCatId).subscribe((data:any)=>{
      if(data.success)
      {
        this.productlist = data.message;
        if(this.productlist.length===0){
          this.noProductFlag = true;
        }else{
          this.noProductFlag = false;
        }
      }else{
          console.log(data.message)
      }
    })
  }

  fetchProductDetails(id:String){
    console.log(id)
    this.productservice.getProductById(id).subscribe((data:any)=>{
      if(data.success)
      {
        this.productid = data.message[0]._id
        this.productname = data.message[0].name
        this.productprice = data.message[0].price
        this.productavailableQuantity = data.message[0].availableQuantity
        this.productdescription = data.message[0].description
        this.productcategoryName = data.message[0].category.name
        this.productcategoryId= data.message[0].categoryId
        this.productsubcategoryName = data.message[0].subcategory.name
        this.productsubcategoryId= data.message[0].subcategoryId
        this.defaultQuantity = 1
      }else{
          console.log(data.message)
      }
    })
  }

  getAllCategories(){
    try{
      this.categoryservice.getAllCategories().subscribe((data:any)=>{
        if(data.success)
        {
          this.categorylist = data.message;
        }else{
            console.log(data.message)
        }
      })
    }catch(err){
      console.log("Problem in retrieving the details of the all categories")
    }
  }

  getCategoryById(id){
    this.categoryservice.getCategoryById(id).subscribe((data:any)=>{
      if(data.success)
      {
        this.subcategoryList = data.message.subcategory;
      }else{
          console.log(data.message)
      }
    })
  }

  updateProduct(id){
    try{
      const reqBody ={
        name : this.productname,
        price: this.productprice,
        description:this.productdescription,
        availableQuantity: this.productavailableQuantity,
        categoryId: this.productcategoryId,
        subcategoryId:this.productsubcategoryId
      }
      this.productservice.updateProduct(reqBody,this.productid).subscribe((data:any)=>{
        if(data.success)
        {
          window.location.reload();
          // this.categorylist = data.message;
        }else{
            console.log(data.message)
        }
      })
    }catch(err){
      console.log("Problem in updating the details of thhe product")
    }
  }
  
  deleteProduct(){
    try{
      this.productservice.deleteProduct(this.productid).subscribe((data:any)=>{
        if(data.success)
        {
          alert("Successfully Deleted")
          window.location.reload();
        }else{
            console.log(data.message)
        }
      })
    }catch(err){
      console.log("Problem in deleting the product")
    }
  }

  isAdminLoggedIn(){
    return this.userService.isAdminLoggedIn();
  }

  isUserLoggedIn(){
    return this.userService.isUserLoggedIn();
  }

  addToCart(quantity:Number){
    if(this.userService.isUserLoggedIn()){

      const reqBody = {
        userId:sessionStorage.getItem('user'),
        productId :this.productid,
        quantity : quantity,
      }
      try {
        this.productservice.addProductToCart(reqBody).subscribe((data:any)=>{
          if(data.success)
          {
            console.log("Successfully Added to Cart")
            window.location.reload();
          }else{
              console.log(data.message)
          }
        })
      } catch (error) {
        console.log("Error occured")
      }
    }else{
      var answer = confirm ("Please log in to add items to cart..!.")
      if (answer){
          window.location.href="/login";
      }
    }
  }
}
