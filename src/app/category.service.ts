import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient :HttpClient) { }

  public getAllCategories()
  {
    return this.httpClient.get(config.URL+"category");
  }

  public getCategoryById(id:String)
  {
    return this.httpClient.get(config.URL+`category/${id}`);
  }

  public getAllSubcategories()
  {
    return this.httpClient.get(config.URL+`subcategory/`);
  }

  public mapSubCategory(catId,subCatId)
  {
    return this.httpClient.put(config.URL+`category/${catId}/${subCatId}`," ");
  }
  public addSubCategory(reqBody:any)
  {
    return this.httpClient.post(config.URL+`subcategory/`,reqBody);
  }

  public addCategory(reqBody:any)
  {
    return this.httpClient.post(config.URL+`category`,reqBody);
  }
}
