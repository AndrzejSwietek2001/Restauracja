import { Component, OnInit } from '@angular/core';
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons/faShoppingCart";

import {faUserCircle, faCog, faBrain, faSignOutAlt, faUsers} from "@fortawesome/free-solid-svg-icons/";

import {Select, Store} from "@ngxs/store";
import {UserState} from "../../store/state/user.state";
import {Observable} from "rxjs";
import {UserModel} from "../../store/models/user.model";
import {LogoutUser} from "../../store/actions/user.action";
import {Router} from "@angular/router";
import {fadeIn, fadeOut} from "../../shared/animations/fade.animation";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [fadeIn, fadeOut],
})
export class NavbarComponent implements OnInit {

  @Select(UserState.getUser) user$: Observable<UserModel>;
  constructor(private store: Store, private router: Router) { }

  faCart = faShoppingCart;
  faUser = faUserCircle;
  faSettings = faCog;
  faBrain = faBrain;
  faLogout = faSignOutAlt;
  faUsers = faUsers;
  check:boolean = false;

  showInfo: boolean = false;

  ngOnInit(): void {
    this.user$.subscribe( data=>{
      console.log(data)
    })
  }

  get userName(){
    return this.user$.subscribe(res=> res.name )
  }

  toggleShowInfo():void { this.showInfo = !this.showInfo; }
  logout(){
    this.store.dispatch(new LogoutUser(''));
    this.showInfo = false;
    this.router.navigate(["/login"]);
    sessionStorage.removeItem("pending-session");
  }

  checkHandle():void{
    this.check = !this.check;
  }

  goTo(link: string) {
    this.router.navigate([link])
  }
}
