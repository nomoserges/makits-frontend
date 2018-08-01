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
  // position informations
  userPosition: any;
  public latitude: number;
  public longitude: number;
  googleAPI_URL: any = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyANKqxSKDlUhL-WvpjSb8dC3HH7SV2UZkc&sensor=false&latlng=';
  myGoogleAPI_KEY: any = 'AIzaSyANKqxSKDlUhL-WvpjSb8dC3HH7SV2UZkc';

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

  public setGPSPosition(position) {
    this.userPosition = position;
  }
  /**
   * Activate the GPS location and getting
   * the position object
   */
  public getGPSPosition() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.googleGeolocation(position);
        },
        error => {
          switch (error.code) {
            case 1:
              this.userPosition = 'Permission Denied';
              break;
            case 2:
              this.userPosition = 'Position Unavailable';
              break;
            case 3:
              this.userPosition = 'Timeout';
              break;
          }
        },
      );
    }
  }


  public googleGeolocation(userCoords) {
    // userCoords will look like long,lat
    return this.http.get(
      this.googleAPI_URL + userCoords,
      {headers: headers}
    );
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
