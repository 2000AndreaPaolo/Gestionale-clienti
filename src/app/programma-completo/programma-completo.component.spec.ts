import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammaCompletoComponent } from './programma-completo.component';

describe('ProgrammaCompletoComponent', () => {
  let component: ProgrammaCompletoComponent;
  let fixture: ComponentFixture<ProgrammaCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgrammaCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammaCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
