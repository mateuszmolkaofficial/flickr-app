import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Post } from '../interfaces/post';

import { Observable } from 'rxjs/Observable'
import { AppStore } from '../app.store';

@Injectable()
export class PostService {
  private internalPostStorage: Array<Post>;
  private apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK'

  posts: Observable<Array<Post>>;

  constructor(private http: HttpClient, private store: Store<AppStore>) {
    this.posts = store.select(store => {
      return store.posts;
    });
  }
  
  loadPosts(tagsSearch?) {
    let url = this.apiUrl;
    if (tagsSearch) {
      url = this.apiUrl + '&tags=' + tagsSearch
    }

    return this.http.jsonp(url, 'JSONP_CALLBACK')
      .subscribe((res: any) => {
        let postsArray: Array<Post> =  res.items;
        this.store.dispatch({type: 'ADD_POSTS', payload: postsArray});
      });
  }
}
