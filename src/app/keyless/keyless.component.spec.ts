import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeylessComponent } from './keyless.component';

describe('KeylessComponent', () => {
  let component: KeylessComponent;
  let fixture: ComponentFixture<KeylessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeylessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeylessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
