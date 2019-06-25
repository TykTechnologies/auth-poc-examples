import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-keyless',
  templateUrl: './keyless.component.html',
  styleUrls: ['./keyless.component.css']
})
export class KeylessComponent {

  constructor(private appService: AppService) { }
  
  requestUrl = new FormControl('httpbin.org/get');

}
