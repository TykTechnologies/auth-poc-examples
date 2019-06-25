import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { KeylessComponent } from './keyless/keyless.component';
import { AuthTokenComponent } from './auth-token/auth-token.component';

@NgModule({
  declarations: [
    AppComponent,
    KeylessComponent,
    AuthTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrettyJsonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }