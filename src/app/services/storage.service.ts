import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  /**
   * Checking if browser support of localstorage
   */
  private initCheck() {
    if (typeof localStorage !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Check user session */
  public checkSession() {
    if ( this.getDatas('user') === null || this.getDatas('user') === undefined) {
      return false;
    } else {
        return true;
    }
  }
  /**
   * setDatas key, value   */
  public setDatas(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
    /* window.localStorage.setItem(key, value); */
  }

  /**   */
  public getDatas(key) {
    /* return window.localStorage.getItem(key);*/
    return JSON.parse( window.localStorage.getItem(key) );
  }
  /**   */
  public removeDatas(key) {
    window.localStorage.removeItem(key);
  }

  public clear() {
    window.localStorage.clear();
  }
}
