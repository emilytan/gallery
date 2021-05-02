import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { HttpParams } from '@angular/common/http';
import { ImageDetail } from '../../model/detail.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  apiUrl =
    'https://picsum.photos/v2/list';

  constructor(private apiService: ApiService) {}

  getImages(pageNumber): Observable<ImageDetail[]> {
    let restUrl = this.apiUrl;
    let params = new HttpParams().append('page', pageNumber);
    return this.apiService.getRest(restUrl, params).pipe(
      map((jsonResponse) => {
        const ImageList = new Array<ImageDetail>();
        jsonResponse.forEach((index) =>
        ImageList.push(
            new ImageDetail(
              index.id,
              index.author,
              index.width,
              index.height,
              index.download_url,
            )
          )
        );
        return ImageList;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}