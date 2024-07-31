import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByContainerComponent } from './search-by-container.component';

describe('SearchByContainerComponent', () => {
  let component: SearchByContainerComponent;
  let fixture: ComponentFixture<SearchByContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchByContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
