import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfile, TIPO_GENERO, TIPO_ESCOLARIDADE, MentorProfile } from 'src/app/models/user.model';
import { MentoresService } from 'src/app/services/mentores.service';

@Component({
  selector: 'app-mentores-delete',
  templateUrl: './mentores-delete.component.html',
})
export class MentoresDeleteComponent implements OnInit {

  user: UserProfile;
  showloading: boolean = false;
  errorMessage: string = undefined;
  genero: string;
  escolaridade: string;

  constructor(
              private router: Router,
              private mentoresService: MentoresService,
              private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params.id, 10);
    this.mentoresService.getById(id).subscribe((result: MentorProfile) => {
      this.user = result;
      this.genero = TIPO_GENERO[result.genero]
      this.escolaridade = TIPO_ESCOLARIDADE[result.escolaridade]
    });
  }

  Excluir(): void {
    this.showloading = !this.showloading;

    this.mentoresService.deleteUser(this.user.id).subscribe(result => {
      this.showloading = !this.showloading;
      if(result == null) {
        this.router.navigate(['/admin/mentores']);
      } else {
        this.errorMessage = result.error;
      }
    })
  }

}
