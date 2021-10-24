import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { menu } from './admin-menu';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  sidebar = true;
  menu = menu;
  currentUser: User;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser()
  }

  toggleSidebar(): void {
    this.sidebar = !this.sidebar;
  }

  logoff(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
