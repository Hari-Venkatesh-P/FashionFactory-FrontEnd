import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient :HttpClient) { }

  public signUpUser(reqBody:any)
  {
    return this.httpClient.post(`http://localhost:4000/user/`,reqBody);
  }


  public signInUser(reqBody:any)
  {
    console.log(reqBody)
    return this.httpClient.post(`http://localhost:4000/user/login`,reqBody);
  }

  public setUserLoggedIn(name:string)
  {
    sessionStorage.setItem("user",name)
  }

  public setAdminLoggedIn()
  {
    sessionStorage.setItem("admin","admin")
  }

  isUserLoggedIn() {
    return !(sessionStorage.getItem('user') === null)
  }

  isAdminLoggedIn() {
    return !(sessionStorage.getItem('admin') === null)
  }

  setToken(token:string){
    sessionStorage.setItem("jwttoken",token)
  }
}
