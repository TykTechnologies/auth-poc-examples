import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-token',
  templateUrl: './auth-token.component.html',
  styleUrls: ['./auth-token.component.css']
})
export class AuthTokenComponent {

  constructor(private http: HttpClient) { }
  
  requestUrl = new FormControl('httpbin.org/get');
  authToken = new FormControl('');

  responsePayload = undefined;

  handleRequest() {
    var requestUrl = this.requestUrl.value
    if (!requestUrl.includes("://")) {
      requestUrl = "http://" + requestUrl;
    }
    return this.http.get(requestUrl, {
        headers: {
          'Authorization': this.authToken.value
        }
      }).subscribe((data) => {
        this.responsePayload = data
      }, 
      err => {
        this.responsePayload = err
      });
  }

}
