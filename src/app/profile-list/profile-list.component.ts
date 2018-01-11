import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  public profiles: Array<Profile>;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSONP_CALLBACK'

    this.http.jsonp(apiUrl, 'JSONP_CALLBACK')
      .subscribe(
        (res: any) => {
          this.profiles = res.items;
          console.log(this.profiles);
        },
        err => {
          console.log(err);
        }
      )
  }

  preventComponentLoad($event) {
    $event.stopPropagation();
  }
}
