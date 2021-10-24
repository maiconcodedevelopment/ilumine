import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfile, TIPO_GENERO, TIPO_ESCOLARIDADE } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-jovens-delete',
  templateUrl: './jovens-delete.component.html',
})
export class JovensDeleteComponent implements OnInit {

  user: UserProfile;
  showloading: boolean = false;
  errorMessage: string = undefined;
  genero: string;
  escolaridade: string;

  constructor(
              private router: Router,
              private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.usersService.getById(id).subscribe((result: UserProfile) => {
      this.user = result;
      this.genero = TIPO_GENERO[result.genero]
      this.escolaridade = TIPO_ESCOLARIDADE[result.escolaridade]
    });
  }

  Excluir(): void {
    this.showloading = !this.showloading

    this.usersService.deleteUser(this.user.id).subscribe(result => {
      this.showloading = !this.showloading
      if(result == null) {
        this.router.navigate(['/admin/mentorados']);
      } else {
        this.errorMessage = result.error
      }
    })
  }

}
