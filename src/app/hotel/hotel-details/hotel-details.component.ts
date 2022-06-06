import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  constructor(private apiService: ApiService,
    private route: ActivatedRoute, private router: Router
  ) { }
  public hotelId: any;
  public hotelDetails: any;
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.hotelId = JSON.parse(params['hotelId']);
    //   console.log(this.hotelId)
    // });
    this.hotelId = this.route.snapshot.params['hotelId'];
    this.apiService
      .getHotelDetailsById(this.hotelId)
      .pipe(
        catchError((error) => {
          console.log('LOCAL ERROR: ', error);
          return throwError(error);
        }),
        finalize(() => console.log('THE END'))
      )
      .subscribe(
        (data) => {
          this.hotelDetails = data[0];
          console.log('HTTP RESPONSE: ', this.hotelDetails)
        },
        (error) => console.log('HTTP ERROR', error),
        () => console.log('HTTP IS DONE')
      );
  }

}
