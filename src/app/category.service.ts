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
}
