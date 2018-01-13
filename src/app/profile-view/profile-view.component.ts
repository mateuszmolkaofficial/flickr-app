import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Profile } from '../interfaces/profile';

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  private profilesObservable: Observable<Array<Profile>>;
  private profiles: Array<Profile>;
  private indexParamSubscribtion: Subscription;
  private subscription: Subscription;
  private profileIndex: number;

  constructor(private route: ActivatedRoute, 
              private profileService: ProfileService,
              private router: Router) {
    this.profilesObservable = profileService.profiles;
  }

  ngOnInit() {
    this.indexParamSubscribtion = this.route.params.subscribe((params: Params) => {
      this.profileIndex = params['index'];
    });

    this.subscription = this.profilesObservable
      .subscribe( profiles => {
        this.profiles = profiles;
      }, error => {
        console.log('Error!')
      });

    if (this.profiles.length === 0) {
      this.router.navigate(['profile'])
    }

    console.log(this.profiles[this.profileIndex]);
  }

  ngOnDestroy() {
    this.indexParamSubscribtion.unsubscribe();
    this.subscription.unsubscribe();
  }

}
