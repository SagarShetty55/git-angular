import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import {HotelListingComponent} from '../hotel/hotel-listing/hotel-listing.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    HomeComponent,
    HotelListingComponent,
    SearchComponent,
    FilterPipe,
    HotelDetailsComponent
  ],
  providers: [ApiService, AuthService],
  imports: [
    CommonModule,
    HotelRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //Ng2SearchPipeModule,
    InfiniteScrollModule
  ]
})
export class HotelModule { }
