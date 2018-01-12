import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileService } from './services/profile.service';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileListComponent },
  { path: 'profile/:index', component: ProfileViewComponent },
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: '**', redirectTo: 'profile', pathMatch: 'full' }
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
