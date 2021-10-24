import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  displayMenu: boolean;
  user: any;
  constructor(private auth: AuthService, private userService: UsersService) { }

  private UpdateProfile(): void {
    if (this.auth.isAuthenticated() && this.auth.currentUser.userProfile) {
      this.user = this.auth.currentUser;
    }
    else {
      this.user = undefined;
    }
  }

  ngOnInit(): void {
    this.UpdateProfile();
  }

  toggleMenu(): void {
    this.displayMenu = !this.displayMenu;
  }

}
