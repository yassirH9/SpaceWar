import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailDialogChartComponent } from './send-email-dialog-chart.component';

describe('SendEmailDialogChartComponent', () => {
  let component: SendEmailDialogChartComponent;
  let fixture: ComponentFixture<SendEmailDialogChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailDialogChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendEmailDialogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
