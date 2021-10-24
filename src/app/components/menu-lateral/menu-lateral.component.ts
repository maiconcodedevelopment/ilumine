import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserProfile, TIPO_USUARIO } from 'src/app/models/user.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
})
export class MenuLateralComponent implements OnInit {

  user: UserProfile;
  activeRoute: string;
  userTipo: string;
  displayMenu: boolean;

  constructor(private authService: AuthService, private router: Router, private userService: UsersService) {
    this.getActiveRoute();
  }

  ngOnInit(): void {
    this.getActiveRoute();
    const currentUser = this.authService.getCurrentUser();
    this.userService.getById(currentUser.id)
      .subscribe( (response: UserProfile) => {
        this.user = response;
        this.userTipo = TIPO_USUARIO[response.tipo];
      });
  }


  getActiveRoute(): void {
    this.router.events.pipe(
       filter(event => event instanceof NavigationEnd)).subscribe( navigationEvent => {
         const navigation = Object.values(navigationEvent);
         this.activeRoute = navigation[1];
    });
  }

  toggleMenu(): void {
    this.displayMenu = !this.displayMenu;
  }

  logout(): void {
    this.authService.logout();
  }
}
