import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { IUser } from '../models/IUser';
import { OrderDetails } from '../models/OrderDetails';
import { UserData } from '../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  public isLoggedIn:boolean = false;
  public userData: UserData;
  public userName: string;
  public searchValue: string;
  public products: any[] = [];
  public categories: any[] = [];
  public categoryId: number;
  public cart: any[] = [];
  public allOrders: any[] = [];
  public isItemInCart: boolean = false;
  public isEmptyCart: boolean = true;
  public totalPrice: number = 0;
  public userDetails: IUser;
  public orderData: any;
  public isAdmin: boolean = false;
  public server: string = "http://localhost:3001/uploads/";

  public cities = [
    {name: "Beer-Sheva"},
    {name: "Netivot"},
    {name: "Rehovot"},
    {name: "Rishon-Letzion"},
    {name: "Tel-Aviv"},
    {name: "Holon"},
    {name: "Jerusalem"},
    {name: "Hertzeliya"},
    {name: "Natanya"},
    {name: "Haifa"}
  ];
  constructor() { }
}
