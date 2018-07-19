import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient , HttpHeaders} from '@angular/common/http';


const headers = new HttpHeaders().set(
  'Content-Type',
  'application/x-www-form-urlencoded'
);

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  data;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * For handling errors on backend api
   * @param error
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  /**
   * Activate the GPS location and getting the coords
   */
  public activeGPS() {
    let gpsLat: any;
    let gpsLong: any;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
              gpsLat = position.coords.latitude;
              gpsLong = position.coords.longitude;
      });
      console.log(gpsLat);
      console.log(gpsLong);
    } else {
      return 'Your device do not support GPS capabilities';
    }

  }

  /**
   * Sending and saving gps coords and place location
   * for the user
   * @param locationDatas: GPS coords
   */
  public setUserLocation(locationDatas) {
    return this.http.post(API_URL + 'users/signup', locationDatas, {headers: headers});
  }
}
