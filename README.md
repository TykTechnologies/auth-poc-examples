# Auth Integration with Tyk - POC
This POC was made so you could test Tyk's integration with different authentication types in a UI, such as OIDC, Bearer Token, etc.

## Todos
- [x] Basic Auth
- [x] OIDC 
- [ ] oauth 2.0
- [ ] Make UI look nicer
- [ ] Login page

## CORS
You may run into CORS issues while doing the various auth types.  You can either allow CORS in your backend servers or download a browser extension to allow CORS.

Simplest solution With Tyk is to do the following:

Go into the endpoint designer -> Advanced Options -> CORS Options -> 
Enable CORS = TRUE
Options pass through = TRUE

Tyk will let Options go through to downstream which will tell our browsers that everything is fine.


## Auth Types
### Open ID Connect (OIDC) (Implicit Flow)
This package uses `angular-oauth2-oidc` to integrate OIDC with Angular.  Following the OIDC spec, you need to provide the discovery document URL in the config, and the client will do the rest.

Clicking "Login" will redirect the user to the login page, and upon success will redirect back to the app where they'll be authenticated. 
You should now see the Auth Token field filled in.  You are ready to make API requests from the client side.

The client will inject an `Authorization` header with `Bearer {id-token}` as the value into your requests.
You will need to edit the `Config` section in `openid.component.ts` to integrate with your Auth Provider of choice.  I used Keycloak.

##### Keycloak
This frontend uses Keycloak for OIDC Auth.  In Keycloak, make sure to create a Realm, Client, User, and allow "Implicit Auth" in Keycloak.
##### Integration With Tyk
In the API Designer, under `Authentication Mode`, Select `Open ID Connect`. Add your issuer.  For me it was `https://{my-keycloak-host}/auth/realms/{realm-name}`
Fill in your client-id with whatever the Client in Keycloak.  Finally, you must enter a Policy that grants access to this particular API.

### Auth Token
Enter your Tyk reverse proxy URI that is being protected by an auth-token.  Finally, enter your Auth Token.
The client will inject the token into a header called `Authorization`.  If you've changed this in the API definition, you'll need to change this in the frontend code also.

## Dev

### Running from Source

1. install dependencies via `npm install`
2. Start server via `ng serve` or `npm start`
3. Go to `http://localhost:4200` to visit the UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.4.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
