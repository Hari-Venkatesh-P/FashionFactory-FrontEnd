import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient :HttpClient) { }

  public signUpUser(reqBody:any)
  {
    return this.httpClient.post(config.URL+`user/`,reqBody);
  } 


  public signInUser(reqBody:any)
  {
    console.log(reqBody)
    return this.httpClient.post(config.URL+`user/login`,reqBody);
  }

  public getUserDetails()
  {
    return this.httpClient.get(config.URL+`user/${sessionStorage.getItem('user')}`);
  }

  public updateUserDetails(reqBody:any)
  {
    return this.httpClient.put(config.URL+`user/`,reqBody);
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

  isTokenPresent() {
    return !(sessionStorage.getItem('jwttoken') === null)
  }
}
