import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ilumine';

  constructor(private auth: AuthService) {
    this.auth.init().subscribe((result) => {
      if (result) {
      }
    });
  }
}
