import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient :HttpClient) { }

  public getAllCategories()
  {
    return this.httpClient.get("http://localhost:4000/category");
  }

  public getCategoryById(id:String)
  {
    return this.httpClient.get(`http://localhost:4000/category/${id}`);
  }

  public getAllSubcategories()
  {
    return this.httpClient.get(`http://localhost:4000/subcategory/`);
  }

  public mapSubCategory(catId,subCatId)
  {
    console.log("Put Method")
    return this.httpClient.put(`http://localhost:4000/category/${catId}/${subCatId}`," ");
  }
  public addSubCategory(reqBody:any)
  {
    return this.httpClient.post(`http://localhost:4000/subcategory/`,reqBody);
  }

  public addCategory(reqBody:any)
  {
    return this.httpClient.post(`http://localhost:4000/category`,reqBody);
  }
}
