import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { GlobalService } from "../services/global.service";

@Injectable({
    providedIn: "root",
})
export class NoAuthGuard implements CanActivate {
    isInitial: boolean = false;
    constructor(
        private global: GlobalService
    ) { }

    canActivate() {
        const currentUser: any = this.global.getStorage("userInfo");
        console.log(currentUser);
        if (currentUser?.full_name || currentUser?.username || currentUser?.id) {
            this.global.goToPage('/teacher');
        } else {
            return true;
        }
        return false
    }
}