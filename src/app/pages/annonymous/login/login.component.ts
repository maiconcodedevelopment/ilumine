import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showloading = false;
  errorMessage: string = undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
    ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.showloading = !this.showloading;
      this.auth.login(this.loginForm.value).subscribe((response: any) => {
        this.showloading = !this.showloading;
        if (response){
          const { roles } = response;
          if (roles[0] === 'Administrador') {
            this.router.navigate(['/admin']);
          } else  {
            this.router.navigate(['/user']);
          }
        }
      });
    }
  }
}
