import { ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HotelListingComponent } from './hotel-listing.component';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { forwardRef } from '@angular/core';
import { of } from 'rxjs';
import { HotelDetailsComponent } from '../hotel-details/hotel-details.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

describe('HotelListingComponent', () => {
  let input: HTMLInputElement;
  let component: HotelListingComponent;
  let fixture: ComponentFixture<HotelListingComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let route: ActivatedRoute
  beforeEach(async () => {
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot'])
    await TestBed.configureTestingModule({
      declarations: [HotelListingComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, HttpClientModule,
        RouterTestingModule.withRoutes(
          [{ path: 'hotel/:hotelId', component: HotelDetailsComponent }]
        ),
      ],
      providers: [
        ApiService,
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => component),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => "Hot", // represents the searchValue
              },
            },
          },
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HotelListingComponent);
        component = fixture.componentInstance;
        activatedRouteSpy.snapshot.and.returnValue(new ActivatedRouteSnapshot)
      })
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });


  it('Should create HotelListingComponent.', () => {
    expect(component).toBeTruthy();
  });

  it('Should create trackByHotelId.', () => {
    let item = {
      "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      "hotelName": "Hotel Dhruv",
      "hotelId": 1
    }

    component.trackByHotelId(item);
    expect(component.trackByHotelId(item).toHaveBeenCalledWith);

  });

  it('should redirect the user to viewHotelDetails', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    let hotelId = 1;
    component.viewHotelDetails(hotelId);

    expect(spy).toHaveBeenCalledWith(['/hotel/', hotelId]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('unit test for getData Api', fakeAsync(() => {
    let spy = spyOn(apiService, 'getData').and.returnValue(of([]));
    let searchValue = "Hot";
    let subSpy = spyOn(apiService.getData(searchValue), 'subscribe');

    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }))
  it('unit test for inside subscribe method', fakeAsync(() => {
    const hotelLists = [
      {
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        hotelName: "Hotel Dhruv",
        hotelId: 1
      },
      {
        image: "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-bengaluru/gallery/featured/bengaluru-gallery-featured-3-swimming-pool-724x407.jpg",
        hotelName: "Hotel Taj",
        hotelId: 2
      },
      {
        image: "https://cdn2.hubspot.net/hubfs/439788/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
        hotelName: "Hotel Maurya",
        hotelId: 3
      },
      {
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80",
        hotelName: "Hotel Abhay",
        hotelId: 4
      }
    ];
    let spy = spyOn(apiService, 'getData').and.returnValue(of(hotelLists))
    component.ngOnInit();
    tick();
    expect(component.hotelList).toBeDefined();
  }))
  it('unit test for getData Api on onScroll', fakeAsync(() => {
    let spy = spyOn(apiService, 'getData').and.returnValue(of([]));
    let searchValue = "Hot";
    let subSpy = spyOn(apiService.getData(searchValue), 'subscribe');

    let e = 1;
    component.onScroll(e);
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }))
  it('unit test for inside subscribe method onScroll', fakeAsync(() => {
    const hotelLists = [
      {
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        hotelName: "Hotel Dhruv",
        hotelId: 1
      },
      {
        image: "https://www.oberoihotels.com/-/media/oberoi-hotels/website-images/the-oberoi-bengaluru/gallery/featured/bengaluru-gallery-featured-3-swimming-pool-724x407.jpg",
        hotelName: "Hotel Taj",
        hotelId: 2
      },
      {
        image: "https://cdn2.hubspot.net/hubfs/439788/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
        hotelName: "Hotel Maurya",
        hotelId: 3
      },
      {
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80",
        hotelName: "Hotel Abhay",
        hotelId: 4
      }
    ];
    let spy = spyOn(apiService, 'getData').and.returnValue(of(hotelLists))
    let e = 1;
    component.onScroll(e);
    tick();
    expect(component.hotelList).toBeDefined();
  }))
});
