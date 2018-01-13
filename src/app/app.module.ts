import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileService } from './services/profile.service';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { profiles } from './reducers/profile.reducer';

const appRoutes: Routes = [
  { path: 'profile-list', component: ProfileListComponent },
  { path: 'profile-view', component: ProfileViewComponent },
  { path: '', redirectTo: 'profile-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'profile-list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileListComponent,
    ProfileViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    HttpClientJsonpModule,
    StoreModule.forRoot({profiles}),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
