import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeKitComponent } from './welcome-kit.component';

describe('WelcomeKitComponent', () => {
  let component: WelcomeKitComponent;
  let fixture: ComponentFixture<WelcomeKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeKitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
