import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
//import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map, catchError } from "rxjs/operators";
import { of, throwError, Observable } from "rxjs";
import { identifierModuleUrl } from "@angular/compiler";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public hotelListApiUrl = environment.hotelListApiUrl;
    constructor(private http: HttpClient) { }

    public hotelList: any = [];
    public getHotelList: any = [];
    public getHotelDetailsData: any = [];

    getData(searchData: any) {
        return this.http.get('/assets/config.json').pipe(map(
            (data) => {
                this.getHotelList = data;
                console.log(searchData == undefined)
                if(searchData == "" ||searchData == undefined){
                    return this.getHotelList.data;
                }
                else{
                    return this.hotelList = this.getHotelList.data.filter(hotel =>
                        hotel.hotelName.toLocaleLowerCase().includes(searchData.toLocaleLowerCase())
                    );
                }
            }));
        // return this.http.get('/assets/config.json');
    }
    getHotelDetailsById(hotelId: any) {
        return this.http.get('/assets/hotel-details.json').pipe(map(
            (data) => {
                console.log(data)
                    this.getHotelDetailsData = data;
                    return this.hotelList = this.getHotelDetailsData.data.filter(val =>
                        val.hotelId == hotelId
                    );
            }));
    }
    getDataNextPage() {
        return this.http.get('/assets/configNew.json');
    }
    getRoleOfCurrentUser(payLoad) {
        return this.http.get('/assets/userList.json');
    }

}