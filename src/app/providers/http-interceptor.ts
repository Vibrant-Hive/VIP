import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpResponse} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {HttpEvent} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('registerUserEvent') == -1 && req.url.indexOf('geolocation') == -1)
      this.spinner.show().then();

    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // @ts-ignore
          if (event.url.indexOf('registerUserEvent') == -1 && event.url.indexOf('geolocation') == -1)
            this.spinner.hide().then();
        }
      }, (error) => {
        this.spinner.hide().then();
      }));
  }
}
