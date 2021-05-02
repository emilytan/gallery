import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageDetail } from '../../model/detail.model';
import { DetailsService } from '../../service/details/details.service';
import { saveAs } from 'file-saver';
import { ApiService } from 'src/app/api/api.service';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  //subscription & error
  getImageSub: any;
  downloadImgSub: any;
  error = false;

  currentPage = 1;
  imageDetail: ImageDetail;
  loading = true;
  imgLoading = true;
  imageWidth: number;
  imageHeight: number;

  constructor(
    private detailService: DetailsService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const imageID = Number(routeParams.get('id'));
    this.getImageDetail(imageID);
  }

  ngOnDestroy() {
    if (!(this.getImageSub === null || this.getImageSub === undefined)) {
      this.getImageSub.unsubscribe();
    }
    if (!(this.downloadImgSub === null || this.downloadImgSub === undefined)) {
      this.downloadImgSub.unsubscribe();
    }
  }

  onLoad(event) {
    if (event && event.target) {
      this.imgLoading = false;
    }
  }

  getImageDetail(id: number) {
    this.loading = true;
    this.getImageSub = this.detailService.getImageInfo(id).subscribe(
      (resp) => {
        this.imageDetail = resp;
        // this.getImageSize(this.imageDetail);
      },
      (err) => {
        this.error = true;
        this.loading = false;
      },
      () => {
        this.error = false;
        this.loading = false;
      }
    );
  }

  getImageSize(img: ImageDetail) {
    const element = document.getElementById('img-id') as HTMLInputElement;
    element.style.width = img.width * 0.15 + 'px';
    element.style.height = img.height * 0.15 + 'px';
  }

  downloadImage(img: ImageDetail) {
    const imgUrl = img.download_url;
    this.downloadImgSub = this.apiService.getRestDownloadFile(imgUrl).subscribe((res: any) => {
      const file = new Blob([res], { type: res.type });
      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = 'quality-photo.jpg';

      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(blob);
        link.remove();
      }, 100);
    });
  }
}
