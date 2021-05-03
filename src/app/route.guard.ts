import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree {
    console.log(route.paramMap.get('id'));

    
    if (route.paramMap.get('id')){
        console.log('enter')
        return true;
    } else {
        console.log('ente false')

        this.router.navigate(['/home']);
    }

    return true;
  }
}
