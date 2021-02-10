import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpBackend } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { LoaderService } from '../services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) {
      }

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loaderService.show();
        return next.handle(req).do(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.loaderService.hide();
            }
          },
          (err: any) => {
            this.loaderService.hide();
          }
        );
      }
    }
