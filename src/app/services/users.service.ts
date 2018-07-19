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
export class UsersService {
  data;
  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  /* Numbers of day for DOB */
  public dobDays() {
    return Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29, 30, 31);
  }

  /* Numbers of months for DOB */
  public dobMonths() {
    return [
      { monthNumber: 1, longname: 'January', shortname: 'Jan' },
      { monthNumber: 2, longname: 'February', shortname: 'Feb' },
      { monthNumber: 3, longname: 'March', shortname: 'Mar' },
      { monthNumber: 4, longname: 'April', shortname: 'Apr' },
      { monthNumber: 5, longname: 'May', shortname: 'May' },
      { monthNumber: 6, longname: 'June', shortname: 'Jun' },
      { monthNumber: 7, longname: 'July', shortname: 'Jul' },
      { monthNumber: 8, longname: 'August', shortname: 'Aug' },
      { monthNumber: 9, longname: 'September', shortname: 'Sep' },
      { monthNumber: 10, longname: 'October', shortname: 'Oct' },
      { monthNumber: 11, longname: 'November', shortname: 'Nov' },
      { monthNumber: 12, longname: 'December', shortname: 'Dec' }
    ];
  }

  /* Numbers of day for DOB */
  public dobYear() {
    const years: any = [];
    // const years = Array(2000);
    const currentdate = new Date();
    /* For mature +18 */
    const startYear = currentdate.getFullYear() - 18;
    const endYear = startYear - 80;
    for (let i = startYear; i > endYear; i--) {
      years.push(i);
    }
    return years;
  }

  /* Get list of users */
  public getUsers() {
    return this.http.get(API_URL + 'users/').subscribe(
            data => console.log(data),
            err => console.error(err),
            () => console.log('done loading foods')
          );
  }
  /**
   * Webservice for user signup
   * @param data
   */
  public setRegister(data) {
    return this.http.post(API_URL + 'users/signup', data, {headers: headers});
  }

  /**
   * Confirmation account with email and token
   * @param data
   */
  public confirmEmailAccount(data) {
    return  this.http.post(API_URL + 'users/confirmaccount', data, {headers: headers});
  }

  /**
   * Webservice for user login
   * @param data
   */
  public setLogin(data) {
    return this.http.post(API_URL + 'users/login', data, {headers: headers});
  }

  /**
   * sendemailToResetPassword
   * @param data
   */
  public sendemailToResetPassword(data) {
    return this.http.post(API_URL + 'users/losspass/sendemail/', data, {headers: headers});
  }

  /**
   * Set the new password for the user
   * @param data
   */
  public changePassword(data) {
    return this.http.post(API_URL + 'users/losspass/change/', data, {headers: headers});
  }

  /**
   * Set personal datas (avatar, firstname, lastname, gender and DateOfBirth)
   * @param data
   */
  public setPersonal(data) {
    return this.http.post(API_URL + 'firstsetup/personal/', data, {headers: headers});
  }

  /**
   * Setting informations about the user activity and skill
   * @param data
   */
  public setJobactivity(data) {
    return this.http.post(API_URL + 'firstsetup/job/', data, {headers: headers});
  }

}
