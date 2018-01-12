import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile'
import { ProfileService } from '../services/profile.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  private profiles: Array<Profile>;
  private timer;
  private profilesSubscribtion: Subscription;
  constructor(private http: HttpClient,
              private profileService: ProfileService) { }

  ngOnInit() {
    console.log(this.profileService.getStorage())
    if (!this.profileService.getStorage()) {
      console.log('new one');
      this.profileService.getAll()
        .subscribe(profiles => { 
          this.profiles = profiles.items;
          console.log(this.profiles)
          this.profileService.setStorage(this.profiles);
        })
    } else {
      console.log('storage');
      this.profiles = this.profileService.getStorage();
    }
  }

  searchFunction($event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
    this.profileService.getAll($event)
        .subscribe(profiles => { 
          this.profiles = profiles.items;
        })
    }, 750)
  }

  preventComponentLoad($event) {
    $event.stopPropagation();
  }
}
