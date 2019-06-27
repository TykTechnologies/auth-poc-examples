import { Component } from '@angular/core';
import { OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-openid',
  templateUrl: './openid.component.html',
  styleUrls: ['./openid.component.css']
})
export class OpenidComponent {
  
  get token() { return this.oauthService.getIdToken(); }
  get claims() { return this.oauthService.getIdentityClaims(); }

  constructor(private route: ActivatedRoute, private oauthService: OAuthService, private http: HttpClient) {
    // Configs - EDIT These
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

  handleRequest() {
    var requestUrl = this.requestUrl.value;
    this.responsePayload = undefined
    if (!requestUrl.includes("://")) {
        requestUrl = "http://" + requestUrl;
    }

    const headers = { headers: {Authorization: 'Bearer ' + this.token}}
    this.http.get(requestUrl, headers).subscribe((data) => {
        this.responsePayload = data
      }, 
      err => {
        this.responsePayload = err
      })
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', this.oauthService.authorizationHeader());
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
