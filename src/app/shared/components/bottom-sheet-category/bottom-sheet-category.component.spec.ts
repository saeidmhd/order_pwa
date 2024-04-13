import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetCategoryComponent } from './bottom-sheet-category.component';

describe('BottomSheetCategoryComponent', () => {
  let component: BottomSheetCategoryComponent;
  let fixture: ComponentFixture<BottomSheetCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomSheetCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
