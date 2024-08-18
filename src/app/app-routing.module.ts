import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailsComponent } from './hotel/hotel-details/hotel-details.component';
import { RoleGuard } from './roles/role.guard';

const routes: Routes = [
      { path: '', component: LoginComponent},
      { path: 'home', component: HomeComponent},
      { path: 'hotel-lists/:searchValue', loadChildren: () => import('./hotel/hotel.module').then(m=>m.HotelModule) , canActivate:[AuthGuard, RoleGuard],
      data:{
        expectedRoles: ['Admin', 'Editor', 'Employee']
      }},
      // { path: 'hotel-lists/:searchData', loadChildren: () => import('./hotel/hotel.module').then(m=>m.HotelModule) },
      { path: 'hotel/:hotelId',component: HotelDetailsComponent, canActivate:[AuthGuard, RoleGuard],
      data:{
        expectedRoles: ['Admin', 'Editor']
      } }

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
