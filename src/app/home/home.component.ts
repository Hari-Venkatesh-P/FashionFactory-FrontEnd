import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { UserService } from '../user.service';
import { flatten } from '@angular/compiler';

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
  filterFlag : Boolean = false;
  modalFlag : Boolean = false;
  modalCatId : String
  constructor(private  router:Router,private activatedRouter: ActivatedRoute,private productservice:ProductService,private categoryservice:CategoryService,private userService :UserService) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params.categoryId && params.subcategoryId) {
        this.getProductsBasedonFilters(params.categoryId,params.subcategoryId);
      }else if (params.newProduct){
        this.getLatestProducts();
      } else {
        this.getLatestProducts();
      }
    })
    this.getAllCategories();
  }

  getProductsBasedonFilters(catId,subCatId){
    try {
      this.productservice.getProductsBasedonFilters(catId,subCatId).subscribe((data:any)=>{
        if(data.success)
        {
          this.productlist = data.message;
          this.filterFlag = true;
          if(this.productlist.length===0){
            this.noProductFlag = true;
          }else{
            this.noProductFlag = false;
          }
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  checkandFetchProductDetails(id:String,role:String){
    if(role ==='user'){
      if(this.userService.isUserLoggedIn()){
        this.fetchProductDetails(id)
        this.modalFlag = true
      }else{
        var answer = confirm ("Please log in to add items to cart..!.")
        if (answer){
           window.location.href="/login";
        }else{
          this.modalFlag = false
        }
      }
    }else{
      if(this.userService.isAdminLoggedIn()){
          this.fetchProductDetails(id)
      }else{
        var answer = confirm ("Kindly Login to make your changes..!")
        if (answer){
           window.location.href="/login";
        }
      }
    }
  }

  fetchProductDetails(id:String){
    try {
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
    } catch (error) {
      console.log(error)
    }
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
        this.modalCatId = id
        this.subcategoryList = data.message.subcategory;
      }else{
          console.log(data.message)
      }
    })
  }

  updateProduct(id,subid){
    try{
      const reqBody ={
        name : this.productname,
        price: this.productprice,
        description:this.productdescription,
        availableQuantity: this.productavailableQuantity,
        categoryId: this.modalCatId,
        subcategoryId:subid
      }
      this.productservice.updateProduct(reqBody,this.productid).subscribe((data:any)=>{
        if(data.success)
        {
          window.location.reload();
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

  addToCart(orderedquantity:string){
    if(this.userService.isUserLoggedIn()){

      const reqBody = {
        userId:sessionStorage.getItem('user'),
        productId :this.productid,
        quantity : parseInt(orderedquantity),
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
  openImage(id){
    id = id+'.png'
    window.open('https://fashion-factory-backend.herokuapp.com/product/image/'+id)
  }

  getLatestProducts(){
    try {
      this.productservice.getLatestProducts().subscribe((data:any)=>{
        if(data.success)
        {
          this.productlist = data.message;
          this.filterFlag = false;
          if(this.productlist.length===0){
            this.noProductFlag = true;
          }else{
            this.noProductFlag = false;
          }
        }else{
            console.log(data.message)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
