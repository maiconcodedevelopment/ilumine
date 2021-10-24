import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-faca-parte',
  templateUrl: './faca-parte.component.html',
  styleUrls: ['./faca-parte.component.scss']
})
export class FacaParteComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  goToAnchor(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
