import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(HotelsList: any[], filterString: string) {
    if (HotelsList.length === 0 || filterString === '') {
      return HotelsList;
    }
    return HotelsList.filter(hotel =>
      hotel.hotelName.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
    );

  }

}
