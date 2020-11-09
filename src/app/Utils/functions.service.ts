import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';
import 'moment/locale/pt';
import { Router } from '@angular/router';
import { GlobalVariables } from './globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class Functions {

  constructor(private alertController: AlertController, private toastController: ToastController,
    private router: Router, private storage: Storage, private gVars: GlobalVariables) { }

  async presentAlert(message: string, title: string = 'Confirmação') {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: 'primary'
    });
    toast.present();
  }

  convertDate(date: Date) {
    if (date) {
      const d = date.toLocaleDateString().split('/');
      return d[2] + '-' + d[1] + '-' + d[0];
    } else {
      return null;
    }
  }

  errorStatus(error: any, checkinError: boolean = false) {
    if (error) {
      if (error.status === 401) {
        this.presentAlert('Utilizador não autorizado.', 'Alerta');
        this.router.navigateByUrl('login/logout');
      } else if (error.status === 403) {
        this.presentAlert('Sem permissões para aceder a este recurso.', 'Alerta');
      } else if (error.status === 404) {
        this.presentAlert('Recurso nao existente.', 'Alerta');
      } else if (error.status === 0) {
        this.presentAlert('Sem acesso a internet.', 'Alerta');
      } else if (error.status === 409) {
        this.presentAlert('Informação já existente na base de dados.', 'Alerta');
      } else if (error.status === 423 && !checkinError) {
        this.router.navigateByUrl('CallCenterAgent/checkin');
        this.presentAlert('É necessário fazer o Check In.', 'Alerta');
      } else if (error.status === 451 && !checkinError) {
        this.router.navigateByUrl('CallCenterAgent/checkin');
        this.presentAlert('É necessário voltar a Trabalhar.', 'Alerta');
      } else {
        this.presentAlert('Ocorreu um erro ao processar os dados.', 'Alerta');
      }
    } else {
      this.presentAlert('Ocorreu um erro ao processar os dados.', 'Alerta');
    }
  }

  // Moment Format

  momentCalendar(date: any, is_unix: boolean = false) {
    if (is_unix) {
      return moment(date * 1000).calendar();
    } else {
      return moment(date).calendar();
    }
  }

  momentRelative(date: any, is_unix: boolean = false) {
    if (is_unix) {
      return moment(date * 1000).fromNow();
    } else {
      return moment(date).fromNow();
    }
  }

  momentRelativeCDR(date: any, is_unix: boolean = false) {
    if (is_unix) {
      // return moment(date * 1000).add(1, 'hour').fromNow();
      return moment(date * 1000).fromNow();
    } else {
      // return moment(date).add(1, 'hour').fromNow();
      return moment(date);
    }
  }

  momentCalendarDateHour(date: any, hour: any) {
    return moment(date + ' ' + hour).calendar();
  }

  convertUnixToTime(time: number) {
    const d = new Date(time * 1000).toUTCString();
    const array = d.split(' ');
    return array[4];
  }

  convertUnixToDateCDR(dateUnix: number) {
    // const date = moment(dateUnix * 1000).add(1, 'hour');
    const date = moment(dateUnix * 1000);
    return date.format('DD-MM-YYYY HH:mm:ss');
  }

  convertUnixToOnlyDateCDR(dateUnix: number) {
    const date = moment(dateUnix * 1000);
    return date.format('DD-MM-YYYY');
  }

  async onLogout() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Confirma que deseja realmente fazer logout?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.storage.remove('user_token').then(() => {
              this.router.navigateByUrl('/login');
            });
          }
        },
        {
          text: 'Não'
        }
      ]
    });

    await alert.present();
  }

  /* DashBoards */

  percentage(ranking: any) {
    if (ranking.month_sales > 0) {
      let s = (Number(ranking.current_sales) * 100) / Number(ranking.month_sales);
      if (s > 100) {
        return '100%';
      }
      return parseInt(s.toString(), 10) + '%';
    } else {
      return '0%';
    }
  }

  prc(ranking: any) {
    let s = (Number(ranking.current_sales) * 100) / Number(ranking.month_sales);
    if (s > 100) {
      return 100;
    }
    return parseInt(s.toString(), 10);
  }

  /**
   * Add two string time values (HH:mm:ss) with javascript
   *
   * Usage:
   *  > addTimes('04:20:10', '21:15:10');
   *  > "25:35:20"
   *  > addTimes('04:35:10', '21:35:10');
   *  > "26:10:20"
   *  > addTimes('30:59', '17:10');
   *  > "48:09:00"
   *  > addTimes('19:30:00', '00:30:00');
   *  > "20:00:00"
   *
   * @param {String} startTime  String time format
   * @param {String} endTime  String time format
   * @returns {String}
   */
  addTimes(startTime, endTime) {
    var times = [0, 0, 0]
    var max = times.length

    var a = (startTime || '').split(':')
    var b = (endTime || '').split(':')

    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }

    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }

    var hours = times[0]
    var minutes = times[1]
    var seconds = times[2]

    if (seconds >= 60) {
      var m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }

    if (minutes >= 60) {
      var h = (minutes / 60) << 0
      hours += h
      minutes = minutes - (60 * h)
    }

    return hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
  }

  openWhatsApp(customer_telephone: any = undefined) {
    const setting = 'width=1370,height=712,resizable,scrollbars=yes,status=1';
    if (customer_telephone) {
      open(
        this.gVars.appUrl + "whatsapp-chat/" + customer_telephone,
        "crm_whatsapp",
        setting,
        true
      );
    } else {
      open(
        this.gVars.appUrl + "whatsapp-chat",
        "crm_whatsapp",
        setting,
        true
      );
    }
  }

  openPopDetails(router: any, target: string = 'crm_detail') {
    open(
      this.gVars.appUrl + router,
      target,
      "width=1370,height=712,resizable,scrollbars=yes,status=1",
      true
    );
  }
}
