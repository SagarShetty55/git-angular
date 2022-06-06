import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelListingComponent } from './hotel-listing/hotel-listing.component';

const routes: Routes = [
    { path: '', component: HotelListingComponent },
    // { path: 'hotel-details',component: HotelDetailsComponent },
    // { path: 'hotel-details/:hotelId',component: HotelDetailsComponent }
    // { path: 'hotel-details/:hotelId',component: HotelDetailsComponent }


]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
