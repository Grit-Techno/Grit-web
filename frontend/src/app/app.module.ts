import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// External Componenents
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AuthModule } from './authentication/auth.module';
import { LoaderInterceptor} from './shared/interceptors/loader.interceptor';
import { FooterComponent, HeaderComponent, SharedModule} from './shared';
import { AuthGuard} from './shared/services';
import {AuthService  } from './shared/services/auth.service';
import {LoaderService  } from './shared/services/loader.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialListModule} from './material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderModule } from './loader/loader.module';
import {BreadcrumbModule} from 'angular-crumbs';
import { MyInterceptor } from './shared/interceptors/interceptor';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule, // core
    CommonModule, // core
    HttpClientModule, // core
    rootRouting, // core
    ToastrModule.forRoot(), // ToastrModule added
    SharedModule, // shared module to import forms module and reactive forms
    AuthModule, // Authentication & login
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialListModule,
    LoaderModule,
    BreadcrumbModule,
  ],
  providers: [AuthGuard, AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
     LoaderService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
