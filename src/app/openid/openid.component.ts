import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-openid',
  templateUrl: './openid.component.html',
  styleUrls: ['./openid.component.css']
})
export class OpenidComponent {
  
  get token() { return this.oauthService.getAccessToken(); }
  get claims() { return this.oauthService.getIdentityClaims(); }

  constructor(private route: ActivatedRoute, private oauthService: OAuthService, private http: HttpClient) {
    // Configs
    const config = new AuthConfig();
    config.issuer = 'https://keycloak.do.poc.tyk.technology/auth/realms/tyk';
    config.clientId = 'tyk-client';
    config.redirectUri = window.location.origin;    
    config.scope = 'openid profile email';
    oauthService.configure(config);

    // For debugging:
    oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

    // Load the shit
    this.oauthService.loadDiscoveryDocument();
    this.oauthService.tryLogin();
   }

   ngOnInit(): void {
     console.log(1+1)
    
   }

  handleRequest() {
    var requestUrl = this.requestUrl.value;
    this.responsePayload = undefined
    if (!requestUrl.includes("://")) {
        requestUrl = "http://" + requestUrl;
    }
    return this.http.get(requestUrl, {headers: this.getHeaders()}).subscribe((data) => {
        this.responsePayload = data
      }, 
      err => {
        this.responsePayload = err
      })
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.oauthService.authorizationHeader());
  }

  discover() {
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    this.oauthService.logOut();
  }

  responsePayload = undefined;
  requestUrl = new FormControl('http://www.tyk-test.com:8080/openid-auth/');

}
