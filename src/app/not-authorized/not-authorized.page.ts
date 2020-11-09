import { Component } from '@angular/core';
import { Functions } from '../Utils/functions.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.page.html',
  styleUrls: ['./not-authorized.page.scss'],
})
export class NotAuthorizedPage {

  constructor(public functions: Functions) { }

  ionViewWillEnter() {
  }

}
