import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../Services/user.service';
import { Storage } from '@ionic/storage';
import { Functions } from '../Utils/functions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(public loadingController: LoadingController, private storage: Storage,
    private userDao: UserService, private functions: Functions, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.logout === 'logout') {
        this.storage.remove('user_token_dash').then();
        this.storage.remove('db_contacts_per_reference_selected_dash').then();
      } else {
        this.storage.get('user_token_dash').then((result) => {
          if (result) {
            this.redirectUser();
          }
        });
      }
    });
  }

  async onLogin() {
    const loading = await this.loadingController.create({
      message: 'A validar os dados...'
    });
    await loading.present();
    const user = this.form.value;
    this.userDao.userLogin(user, loading).then((user_result) => {
      if (user_result) {
        this.storage.set('user_token_dash', user_result['api_token']).then(async () => {
          this.redirectUser(loading);
        }, () => {
          loading.dismiss();
          this.functions.presentAlert('Ocorreu um erro ao logar!');
        });
      }
    });
  }

  async redirectUser(loading?: any) {
    if (loading) loading.dismiss();
    this.router.navigateByUrl('/CallCenterAdmin/wallboard');
    this.functions.presentToast('Logado com Sucesso');
  }
}
