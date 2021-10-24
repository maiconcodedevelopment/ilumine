import { AuthService } from './../../../auth/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { MentorProfile, UserProfile } from 'src/app/models/user.model';
import { TrilhasService } from 'src/app/services/trilhas.service';
import { TrilhaListModel } from 'src/app/models/trilha-list.model';
import { MentoresService } from 'src/app/services/mentores.service';
import { SolicitacaoMentoria } from 'src/app/models/solicitacao-mentoria';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mentorias',
  templateUrl: './mentorias.component.html',
  styleUrls: ['./mentorias.component.scss']
})
export class MentoriasComponent implements OnInit {

  limit: number = 10
  offset: number = 0;

  trilhaFinalizada = false;

  user: UserProfile;
  listaMentores: MentorProfile[] = [];
  solicitacoes: SolicitacaoMentoria[] = [];
  mentor: SolicitacaoMentoria;
  hasMentor: boolean = false;

  constructor(private mentoresService: MentoresService,
              private usersService: UsersService,
              private authService: AuthService,
              private toastr: ToastrService,
              private trilhasService: TrilhasService) { }

  ngOnInit(): void {
    this.trilhasService.getList(100, 0).subscribe((result: TrilhaListModel[]) => {
      this.trilhaFinalizada = result.findIndex(i => i.totalConteudos !== i.totalConcluidos && i.id === 7) === -1;
    });
    const currentUser = this.authService.getCurrentUser();
    this.usersService.getById(currentUser.id)
      .subscribe( (response: UserProfile) => {
        this.user = response;
        this.getAllMentors();
        this.atualizaSolicitacoes();
      });
  }

  atualizaSolicitacoes(): void {
    this.mentoresService.getSolicitacoes().subscribe(result => {
      this.solicitacoes = result;
      const mentorIndex = this.solicitacoes.findIndex(i => i.status === 2);
      this.hasMentor = mentorIndex !== -1;
      if (mentorIndex !== -1) {
        this.mentor = this.solicitacoes[mentorIndex];
      }
    });
  }

  hasSolicitacao(idMentor: string): number {
    return this.solicitacoes.findIndex(i => i.idUsuario === parseInt(idMentor, 10));
  }

  getAllMentors(): void {
    this.mentoresService.getList(this.limit, this.offset).subscribe(result => this.listaMentores = result);
  }

  solicitarCancelarMentoria(idMentor: string): void {
    const mentor = parseInt(idMentor, 10);
    const mentoriaIndex = this.hasSolicitacao(idMentor);
    if (mentoriaIndex !== -1) {
      const idSolicitacao = this.solicitacoes[mentoriaIndex].id;
      this.mentoresService.cancelarSolicitacao(idSolicitacao).subscribe(() => {
        this.alert('Solicitação cancelada', '');
        this.solicitacoes.splice(mentoriaIndex, 1);
      });
    } else {
      this.mentoresService.solicitarMentoria(mentor).subscribe(() => {
        this.alert('Solicitação enviada', 'Aguarde a resposta do mentor');
        this.atualizaSolicitacoes();
      });
    }
  }

  alert(title: string, message: string): void {
    this.toastr.success(message, title,  {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    });
  }

}
