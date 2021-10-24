import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MentoresService } from 'src/app/services/mentores.service';
import { SolicitacaoMentoria } from 'src/app/models/solicitacao-mentoria';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mentorias-educador',
  templateUrl: './mentorias-educador.component.html',
  styleUrls: ['./mentorias-educador.component.scss']
})
export class MentoriasEducadorComponent implements OnInit {

  modalConfiguracao: boolean = false;
  tabActive: number = 1;
  mentoriasAtuais: SolicitacaoMentoria[] = [];
  solicitacoes: SolicitacaoMentoria[] = [];
  angForm: FormGroup;
  quantidadeMentorados: number;
  biografia: string;

  constructor(private mentoriasService: MentoresService,
              private auth: AuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    this.updateSolicitacoes();
    this.mentoriasService.getDadosMentoria().subscribe(result => {
      this.quantidadeMentorados = result.quantidadeMentoria;
      this.biografia = result.biografia;
    });
  }

  updateSolicitacoes(): void {
    this.mentoriasService.getSolicitacoes().subscribe((result: SolicitacaoMentoria[])  => {
      this.mentoriasAtuais = result.filter(i => i.status === 2);
      this.solicitacoes = result.filter(i => i.status === 1);
    });
  }

  toggleActivePage(): void {
    this.tabActive === 1 ? this.tabActive = 2 : this.tabActive = 1;
  }

  responderSolicitacao(idSolicitacao: number, resposta: boolean): void {
    const model = {
      idSolicitacao,
      resposta
    };
    this.mentoriasService.responderSolicitacao(model).subscribe(() => {
      this.alert('Solicitação respondida.', '');
      this.updateSolicitacoes();
      if (resposta) {
        this.tabActive = 1;
      }
    });
  }

  cancelarMentoria(idSolicitacao): void {
    this.mentoriasService.cancelarSolicitacao(idSolicitacao).subscribe(() => {
      this.alert('Mentoria cancelada.', '');
      this.updateSolicitacoes();
    });
  }

  atualizaDadosMentoria(): void {
    const model = {
      quantidadeMentoria: this.quantidadeMentorados,
      biografia: this.biografia
    };
    this.mentoriasService.changeDadosMentoria(model).subscribe(() => {
      this.alert('Configurações atualizadas.', '');
      this.modalConfiguracao = false;
    });
  }

  alert(title: string, message: string): void {
    this.toastr.success(message, title,  {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    });
  }
}
