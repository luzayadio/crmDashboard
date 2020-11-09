import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Functions } from '../Utils/functions.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any = undefined;
  menu_items: any[] = [];
  leadList: any[] = [];
  show_objectives: boolean = false;

  constructor(public loadingController: LoadingController, private router: Router,
    private storage: Storage, private userDao: UserService, public functions: Functions,
    public alertController: AlertController, public modalController: ModalController) {

  }


  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'A carregar os dados...'
    });
    await loading.present();
    try {
      this.storage.get('user_token').then((result) => {
        if (result) {
          this.userDao.getUserInfoByToken(result, loading).then(async (user) => {
            this.user = user;
            loading.dismiss();
          });
        } else {
          loading.dismiss();
          this.functions.presentAlert('É necessário fazer login para acessar esta página!', 'Alerta');
          this.router.navigateByUrl('/login');
        }
      });
    } catch {
      loading.dismiss();
    }
  }
}
