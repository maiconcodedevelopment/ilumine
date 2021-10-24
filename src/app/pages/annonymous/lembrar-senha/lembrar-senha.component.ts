import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lembrar-senha',
  templateUrl: './lembrar-senha.component.html',
  styleUrls: ['./lembrar-senha.component.scss']
})
export class LembrarSenhaComponent implements OnInit {

  loginForm: FormGroup;
  showloading = false;
  errorMessage: string = undefined;
  constructor(
    private fb: FormBuilder,
    private alertService: ToastrService,
    private auth: AuthService
    ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ]
    });
  }

  lembrarSenha(): void {
    if (this.loginForm.valid) {
      this.showloading = !this.showloading;
      this.auth.lembrarSenha(this.loginForm.value).subscribe((response: any) => {
        this.showloading = !this.showloading;
        this.alertService.success('E-mail enviado com sucesso', 'Recuperação de senha',  {
          timeOut: 5000,
          progressBar: true,
          closeButton: true,
        });
      });
    }
  }
}
