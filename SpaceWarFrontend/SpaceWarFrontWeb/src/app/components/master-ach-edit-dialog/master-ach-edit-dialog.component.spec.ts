import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAchEditDialogComponent } from './master-ach-edit-dialog.component';

describe('MasterAchEditDialogComponent', () => {
  let component: MasterAchEditDialogComponent;
  let fixture: ComponentFixture<MasterAchEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterAchEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterAchEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
