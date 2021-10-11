import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { StateService } from '../services/state.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    public constructor(private stateService: StateService, private router: Router) { }

    public canActivate(): boolean {
        let token = localStorage.getItem("token");
        let user: any = jwt_decode(token);
        let userType = user.sub;
        console.log(userType);

        if (userType == "ADMIN") {
            this.stateService.isAdmin = true;
            this.stateService.isLoggedIn = true;
            return true;
        }

        this.router.navigateByUrl("/login");
        alert("False");
        return false;
    }

}
