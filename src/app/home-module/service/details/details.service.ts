import { Injectable } from '@angular/core';
import { ImageDetail } from '../../model/detail.model';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  apiUrl = 'https://picsum.photos';

  constructor(private apiService: ApiService) {}

  getImageInfo(id: number): Observable<ImageDetail> {
    let restUrl = this.apiUrl + '/id/' + id + '/info';
    return this.apiService.getRest(restUrl).pipe(
      map((jsonResponse) => {
        let imgDetails: ImageDetail;
        imgDetails = {
          id: jsonResponse.id,
          author: jsonResponse.author,
          width: jsonResponse.width,
          height: jsonResponse.height,
          download_url: jsonResponse.download_url,
        };
        return imgDetails;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }


}
