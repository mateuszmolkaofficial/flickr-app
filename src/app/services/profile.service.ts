import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Profile } from '../interfaces/profile';

import { Observable } from 'rxjs/Observable'
import { AppStore } from '../app.store';

@Injectable()
export class ProfileService {
  private internalProfileStorage: Array<Profile>;
  private apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK'

  profiles: Observable<Array<Profile>>;

  constructor(private http: HttpClient, private store: Store<AppStore>) {
    this.profiles = store.select(store => {
      return store.profiles;
    });
  }
  
  loadProfiles(tagsSearch?) {
    if (tagsSearch) {
      this.apiUrl = this.apiUrl + '&tags=' + tagsSearch
    }

    return this.http.jsonp(this.apiUrl, 'JSONP_CALLBACK')
      .subscribe((res: any) => {
        let profilesArray: Array<Profile> =  res.items;
        this.store.dispatch({type: 'ADD_PROFILES', payload: profilesArray});
      });
  }
}
