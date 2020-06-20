import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder ,Validators} from '@angular/forms';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productForm: FormGroup;

  subcategoryList : Array<any> = []

  categorylist : Array<any> = []

  allSubCategoriesList : Array<any> = []

  mapCategoryId : String

  mapSubCategoryId : String

  formData = new FormData();


  constructor(private fb:FormBuilder,private productService : ProductService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.productForm  = this.fb.group({  
      name:  ['',[Validators.required]],
      price:  ['',[Validators.required]],
      description:  ['',[Validators.required]],
      subcategoryId : ['',[Validators.required]],
      categoryId : ['',[Validators.required]],
      availableQuantity : ['',[Validators.required]],
      productImage: [''],
    });
    this.getAllCategories();
    this.getAllSubcategories();
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('productImage', file);
    }
  } 

  addProduct(){
    if(this.productForm.valid){
      this.formData.append('name', this.productForm.get('name').value);
      this.formData.append('price', this.productForm.get('price').value);
      this.formData.append('description', this.productForm.get('description').value);
      this.formData.append('subcategoryId', this.productForm.get('subcategoryId').value);
      this.formData.append('categoryId', this.productForm.get('categoryId').value);
      this.formData.append('availableQuantity', this.productForm.get('availableQuantity').value);
      this.productService.addProduct(this.formData).subscribe((data:any)=>{
        console.log(data)
        if(data.message)
        {
          alert(data.message);
          window.location.reload()
        }else{
          alert(data.message);
        }
      })
    }
    else{
      alert("Fill All required Fields");
    }
  }


  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((data:any)=>{
      if(data.success)
      {
        this.categorylist = data.message;
      }
    })
  }


  getAllSubcategories(){
    this.categoryService.getAllSubcategories().subscribe((data:any)=>{
      if(data.success)
      {
        this.allSubCategoriesList = data.message;
        console.log(this.allSubCategoriesList)
      }
    })
  }

  getCategoryById(id){
    this.categoryService.getCategoryById(id).subscribe((data:any)=>{
      if(data.success)
      {
        this.subcategoryList = data.message.subcategory;
      }else{
          console.log(data.message)
      }
    })
  }

  addSubcategory(name){
    if(name ===null || name===''){
      alert("Fill the Required Field")
    }else{
      const reqBody = {
        name : name
      }
      this.categoryService.addSubCategory(reqBody).subscribe((data:any)=>{
        if(data.success)
        {
          alert("Sub Category Added Successfully")
        }else{
          alert("Issue with adding SubCategory")
            console.log(data.message)
        }
      })
    }
  }

  addCategory(name){
    if(name===null || name ===''){
      alert("Fill the Required Field")
    }else{
      const reqBody = {
        name : name
      }
      this.categoryService.addCategory(reqBody).subscribe((data:any)=>{
        if(data.success)
        {
          alert("Category Added Successfully")
        }else{
          alert("Issue with adding Category")
            console.log(data.message)
        }
      })
    }
  }

  mapSubCategory(catId,subCatId){
    if(catId===null || subCatId===null){
      alert("Unable to Map Subcategory")
    }else{
      this.categoryService.mapSubCategory(catId,subCatId).subscribe((data:any)=>{
        if(data.success)
        {
          alert("Category Mapped Successfully")
        }else{
          alert("Issue with Mapping SubCategory")
            console.log(data.message)
        }
      })
    }
  }
}
