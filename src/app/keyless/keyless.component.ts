import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-keyless',
  templateUrl: './keyless.component.html',
  styleUrls: ['./keyless.component.css']
})
export class KeylessComponent {

  constructor(private http: HttpClient) { }  
  responsePayload = undefined;
  requestUrl = new FormControl('httpbin.org/get');

  handleRequest() {
    var requestUrl = this.requestUrl.value;
    this.responsePayload = undefined
    if (!requestUrl.includes("://")) {
        requestUrl = "http://" + requestUrl;
    }
    return this.http.get(requestUrl).subscribe((data) => {
        this.responsePayload = data
      }, 
      err => {
        this.responsePayload = err
      })
  }

}
