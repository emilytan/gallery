import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, timeoutWith } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  requestTimeout = 60000;

  constructor(private httpreq: HttpClient) {}

  getRest(resturl: string, queryParam?: HttpParams): Observable<any> {
    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: queryParam,
    };
    return this.httpreq.get(resturl, header).pipe(
      timeoutWith(this.requestTimeout, throwError(new Error('[TIMEOUT_ERR]: '))),
      catchError((e) => {
        return throwError(e);
      })
    );
  }

  getRestDownloadFile(resturl: string): Observable<any> {
    return this.httpreq.get(resturl, { responseType: 'blob' as 'json' }).pipe(
      timeoutWith(this.requestTimeout, throwError(new Error('[TIMEOUT_ERR]: '))),
      catchError((e) => {
        return throwError(e);
      })
    );
  }
}
