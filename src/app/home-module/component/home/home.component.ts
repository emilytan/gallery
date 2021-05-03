import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageDetail } from '../../model/detail.model';
import { HomeService } from '../../service/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  //subscription & error
  subscription: any;
  error = false;

  currentPage = 1;
  images = new Array<ImageDetail>();
  loading = true;

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveImage(1);
  }

  ngOnDestroy() {
    if (!(this.subscription === null || this.subscription === undefined)) {
      this.subscription.unsubscribe();
    }
  }

  retrieveImage(pageNumber: number) {
    this.loading = true;
    this.currentPage = pageNumber;
    this.subscription = this.homeService.getImages(pageNumber).subscribe(
      (resp) => {
        this.images = resp;
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

  imgDetails(image) {
    sessionStorage.setItem('id', image.id);
    this.router.navigate(['/detail/' + image.id]);
  }
}
