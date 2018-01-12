import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Profile } from '../interfaces/profile'
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  private profiles: Array<Profile>;
  private timer;
  constructor(private http: HttpClient,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.get()
      .subscribe(profiles => {
        
        this.profiles = profiles.items;
        console.log(this.profiles);
      })

  }

  searchFunction($event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.profileService.get($event)
        .subscribe( profiles => {
          this.profiles = profiles.items;
        })
    }, 750)
  }

  preventComponentLoad($event) {
    $event.stopPropagation();
  }
}
