import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-hotellisting',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router
    ) { }
  public thumbnail: any;
  public hotelList: any = [];
  public hotel: any = [];
  public filteredString: any;
  public searchData: any;
  firstCall: number = 1;


  ngOnInit(): void {
    const routeparam = this.route.queryParams.subscribe(params => {
      this.searchData = JSON.parse(params['searchValue']);
    });
   // this.searchData = localStorage.getItem("searchText");
    this.apiService
      .getData(this.searchData)
      .pipe(
        catchError((error) => {
          console.log('LOCAL ERROR: ', error);
          return throwError(error);
        }),
        finalize(() => console.log('THE END'))
      )
      .subscribe(
        (data) => {
          this.hotelList = data;
          console.log('HTTP RESPONSE: ', this.hotelList)
        },
        (error) => console.log('HTTP ERROR', error),
        () => console.log('HTTP IS DONE')
      );
  }

  onScroll(e) {
    console.log('scrolled!!', e);
    this.apiService
    .getData(this.searchData)
    .pipe(
      catchError((error) => {
        console.log('LOCAL ERROR: ', error);
        return throwError(error);
      }),
      finalize(() => console.log('THE END'))
    )
    .subscribe(
      (data) => {
        this.hotelList = [...this.hotelList, ...data];
        console.log('HTTP RESPONSE: ', this.hotelList)
      },
      (error) => console.log('HTTP ERROR', error),
      () => console.log('HTTP IS DONE')
    );
  }

  nextPage() {
    this.apiService.getDataNextPage().subscribe((baseImage: any) => {
      this.hotelList = baseImage.data;
    })
  }
  trackByHotelId(index, item) {
    return item.hotelId;
  }
  viewHotelDetails(hotelId: any){
    this.router.navigate(['/hotel/',hotelId]);
//    this.router.navigate(['/hotel-lists/hotel-details',hotelId]);
    //this.router.navigate(['/hotel-details'], { queryParams: { hotelId: JSON.stringify(hotelId)} });
  }
}
