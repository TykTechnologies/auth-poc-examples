import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) { }

  clickMessage = undefined;

  clicker(requestUrl) {
    this.clickMessage = undefined
    this.getRequestUrl(requestUrl.value)
    .subscribe((data) => {
      this.clickMessage = data
    }, 
    err => {
      this.clickMessage = err
    })
  }

  getRequestUrl(requestUrl: string) {
    if (!requestUrl.includes("://")) {
        requestUrl = "http://" + requestUrl;
    }
    return this.http.get(requestUrl);
  }
}
