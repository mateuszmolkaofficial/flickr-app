import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile'
import { ProfileService } from '../services/profile.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit, OnDestroy {
  profilesObservable: Observable<Array<Profile>>;
  profiles: Array<Profile>;
  
  private subscription: Subscription;
  private timer;

  constructor(private http: HttpClient,
              private profileService: ProfileService
             ) {
              this.profilesObservable = profileService.profiles;
             }

  ngOnInit() {
    this.subscription = this.profilesObservable
        .subscribe(
            profiles => {
              this.profiles = profiles;
            },
            error => {
              console.log('error')
            }
        );
    if (this.profiles.length === 0) {
      this.profileService.loadProfiles()
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchFunction($event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.profileService.loadProfiles($event)
    }, 750)
  }

  preventComponentLoad($event) {
    $event.stopPropagation();
  }
}
