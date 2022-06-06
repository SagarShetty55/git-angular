import { ComponentFixture, TestBed , inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HotelListingComponent } from './hotel-listing.component';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { forwardRef } from '@angular/core';
import { of } from 'rxjs';

describe('MeasureKMLComponent', () => {
  let input : HTMLInputElement;
  let component: HotelListingComponent;
  let fixture: ComponentFixture<HotelListingComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelListingComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        ApiService,
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => component),
        }
      ]
    })
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });


  it('Should create HotelListingComponent.', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListingComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

});
