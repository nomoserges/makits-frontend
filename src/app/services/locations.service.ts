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
  position: any;
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

  private setGPSPosition(position) {
    this.position = position;
  }
  /**
   * Activate the GPS location and getting the coords
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
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        },
      );
    }
  }


  public googleGeolocation(userPosition) {
    // we launch gps capablities
    let serverResponse;
    this.http.get(
      /*this.googleAPI_URL + userPosition.coords.longitude
      + ',' + userPosition.coords.latitude,*/
      this.googleAPI_URL + '3.903574,11.528872',
      {headers: headers}
    ).subscribe(res => {
      serverResponse = res;
      console.log('location result: ' + JSON.stringify(serverResponse.results[0]['address_components']));
    });
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
