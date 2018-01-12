import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProfileService {
  private internalProfileStorage: Array<Profile>;
  private apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK'
  constructor(private http: HttpClient) { }

  setStorage(profiles: Array<Profile>) {
    this.internalProfileStorage = profiles;
  }

  getStorage(): any {
    console.log(this.internalProfileStorage);
    (!this.internalProfileStorage) ? false: Object.assign({}, this.internalProfileStorage);
  }

  getAll (tagsSearch?): Observable<any>  {
    if (tagsSearch) {
      this.apiUrl = this.apiUrl + '&tags=' + tagsSearch
    }
    return this.http.jsonp(this.apiUrl, 'JSONP_CALLBACK')
  }
}
