import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

import { MessagesComponent } from './messages/messages.component';
// import {InMemoryDataService} from './mock/server/in-memory-data.service';
import {HeroService} from './service/hero.service';
import {MessageService} from './service/message.service';

import { AlertModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap';
import { MakeheroComponent } from './makehero/makehero.component';

@NgModule({
  imports: [
    AlertModule.forRoot()
    , CarouselModule.forRoot()
    , BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , AppRoutingModule
    , HttpClientModule

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // , HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  declarations: [
    AppComponent
    , DashboardComponent
    , HeroesComponent
    , HeroDetailComponent
    , MessagesComponent
    , HeroSearchComponent
    , MakeheroComponent
  ],
  providers: [ HeroService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
