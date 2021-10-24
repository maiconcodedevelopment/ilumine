import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrilhaDetalhesComponent } from './trilha-detalhes.component';

describe('TrilhaDetalhesComponent', () => {
  let component: TrilhaDetalhesComponent;
  let fixture: ComponentFixture<TrilhaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrilhaDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrilhaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
