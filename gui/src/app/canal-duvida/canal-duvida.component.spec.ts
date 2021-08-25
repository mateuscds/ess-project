import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalDuvidaComponent } from './canal-duvida.component';

describe('CanalDuvidaComponent', () => {
  let component: CanalDuvidaComponent;
  let fixture: ComponentFixture<CanalDuvidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanalDuvidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalDuvidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
