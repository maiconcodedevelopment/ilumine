import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ConteudoModel } from 'src/app/models/conteudo.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
})
export class VideoComponent implements OnInit, OnChanges {

  @Input() conteudo: ConteudoModel;
  safeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.updateSafeUrl();
  }

  ngOnChanges(): void {
    this.updateSafeUrl();
  }

  updateSafeUrl(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.conteudo.url);
  }

}
