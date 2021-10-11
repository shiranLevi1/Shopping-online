import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserData } from '../models/UserData';
import { UserLoginDetails } from '../models/UserLoginDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
  }

  public register(registrationData: any): Observable<UserData> {

    return this.http.post<UserData>("http://localhost:3001/users/", registrationData);
  }
  
    public isEmailExsist(email: string): Observable<string> {
  
      return this.http.put<string>("http://localhost:3001/users/isEmailExsist", {email});
    }
  
    public isIdExsist(id: string): Observable<string> {
  
      return this.http.put<string>("http://localhost:3001/users/isIdExsist", {id});
    }

  public updateUserDetails(userData: IUser): Observable<IUser> {

    return this.http.put<IUser>("http://localhost:3001/users/", userData);
  }
  
    public getUserDetails(): Observable<IUser> {
  
      return this.http.get<IUser>("http://localhost:3001/users/");
    }

  public updateUserEmail(email: string): Observable<string> {

    return this.http.put<string>("http://localhost:3001/users/updateUserEmail", {email});
  }

}
