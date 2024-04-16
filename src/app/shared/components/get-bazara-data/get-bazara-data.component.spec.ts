import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBazaraDataComponent } from './get-bazara-data.component';

describe('GetBazaraDataComponent', () => {
  let component: GetBazaraDataComponent;
  let fixture: ComponentFixture<GetBazaraDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetBazaraDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetBazaraDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
