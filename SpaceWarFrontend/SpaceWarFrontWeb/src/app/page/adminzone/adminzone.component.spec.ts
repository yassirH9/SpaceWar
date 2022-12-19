import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminzoneComponent } from './adminzone.component';

describe('AdminzoneComponent', () => {
  let component: AdminzoneComponent;
  let fixture: ComponentFixture<AdminzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminzoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
