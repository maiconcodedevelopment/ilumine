import { PostModel } from './../../../../models/post.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {

  postForm: FormGroup;
  showloading: boolean = false;
  postModel = new PostModel();
  fotoDestaque: any;
  previewUrl: string | ArrayBuffer;
  // Configuração Editor
  config: AngularEditorConfig = {
    editable: true,
    minHeight:'400px',
    sanitize: true,
    spellcheck: true,
    toolbarHiddenButtons: [
      [ 'insertImage',
      'insertVideo',
      'insertHorizontalRule'
      ]
    ]
  };


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: PostService
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.postForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)] ],
      resumo: ['', [Validators.required, Validators.maxLength(1000)] ],
      texto: ['', [Validators.required] ],
      destaque: [0, [Validators.required] ],
      file: ['']
    });
  }

  convertForm(){
      this.showloading = true;
      this.postModel.titulo = this.postForm.controls.titulo.value;
      this.postModel.resumo = this.postForm.controls.resumo.value;
      this.postModel.destaque = Boolean(this.postForm.controls.destaque.value);
      this.postModel.texto = this.postForm.controls.texto.value;
  }

  salvar(){
    if (this.postForm.valid){
      this.convertForm();
      this.blogService.createItem(this.postModel, this.fotoDestaque).subscribe(result => this.router.navigate(['/admin/blog']));
    }
  }

  setFotoDestaque(event){
    this.fotoDestaque = event.target.files[0];
    this.preview();
  }

  preview(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.fotoDestaque);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }
}
