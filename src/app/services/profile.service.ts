import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';

@Injectable()
export class ProfileService {

  private apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK'

  constructor(private http: HttpClient) { }

  get (tagsSearch?): Observable<any>  {
    if (tagsSearch) {
      this.apiUrl = this.apiUrl + '&tags=' + tagsSearch
    }
    return this.http.jsonp(this.apiUrl, 'JSONP_CALLBACK')
  }
}
