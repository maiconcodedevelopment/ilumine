import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {

  loginForm: FormGroup;
  showloading = false;
  errorMessage: string = undefined;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private alertService: ToastrService,
              private activatedRoute: ActivatedRoute)
  {
    const resetCode = this.activatedRoute.snapshot.queryParams.code;
    if (resetCode && resetCode !== '') {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        code: [''],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      });
      this.loginForm.controls.code.setValue(resetCode);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

  }

  resetarSenha(): void {
    const emailValid = this.loginForm.controls.email.errors === null;
    const senhaValid = this.loginForm.controls.password.errors === null;
    const confirmarSenhaValid = this.loginForm.value.password === this.loginForm.value.confirmPassword;
    if (!confirmarSenhaValid) {
      this.alertService.warning('Senhas não conferem.', 'Recuperação de senha',  {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
      });
    } else {
      if (emailValid && senhaValid) {
        this.alertService.success('Senha alterada com sucesso!');
        this.auth.recuperarSenha(this.loginForm.value).subscribe(result => this.router.navigate(['/login']));
      } else {
        Object.keys(this.loginForm.controls).forEach(field => {
          const control = this.loginForm.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      }
    }
  }
}
