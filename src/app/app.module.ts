import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';
import { HttpClientModule } from '@angular/common/http';
import { StateComponent } from './components/state/state.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    VaccinationComponent,
    StateComponent,
    DashboardCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GoogleChartsModule,
    MatRadioModule,
    MatGridListModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
