import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

    public constructor(private router: Router) { }

    public canActivate(): boolean {
        let token = localStorage.getItem("token");
        let user: any = jwt_decode(token);
        let userType = user.sub;
        console.log(userType);

        if (userType == "CUSTOMER") {
            return true;
        }

        this.router.navigateByUrl("/login");
        alert("False");
        return false;
    }

}
