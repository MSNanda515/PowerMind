import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashComponent } from './dash/dash.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacySliderModule} from "@angular/material/legacy-slider";


@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    DashComponent,
    LoginPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatLegacySliderModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
