import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
