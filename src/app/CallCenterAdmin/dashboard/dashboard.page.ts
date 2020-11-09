import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from '@ionic/angular';
import { Functions } from '../../Utils/functions.service';
import { UserService } from '../../Services/user.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Subscription, Observable } from 'rxjs';
import { DxChartComponent, DxPieChartComponent } from 'devextreme-angular';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage {
  user: any = undefined;
  show: boolean = false;
  sale_per_plans: any[] = [];
  weekly_sales: any[] = [];
  monthly_sales: any[] = [];
  sale_per_origin: any[] = [];
  cc_objective: any = undefined;
  subscription: Subscription[] = [];
  team_sale_histogram: any[] = [];
  sale_state: any[] = [];
  sale_performance: any[] = [];
  @ViewChild(DxChartComponent, {}) chart: DxChartComponent;
  @ViewChild('chart2', {}) chart2: DxChartComponent;
  @ViewChild('chart3', {}) chart3: DxChartComponent;
  @ViewChild('chart4', {}) chart4: DxChartComponent;

  @ViewChild(DxPieChartComponent, {}) pie: DxPieChartComponent;
  @ViewChild('pie2', {}) pie2: DxPieChartComponent;
  @ViewChild('pie3', {}) pie3: DxPieChartComponent;
  @ViewChild('pie4', {}) pie4: DxPieChartComponent;
  @ViewChild('pie5', {}) pie5: DxPieChartComponent;

  constructor(public loadingController: LoadingController, private router: Router,
    private storage: Storage, private userDao: UserService, public functions: Functions,
    public alertController: AlertController, private dashboardDao: DashboardService,
  ) { }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'A carregar os dados...'
    });
    await loading.present();
    try {
      this.storage.get('user_token_dash').then(async (user_api_token) => {
        if (user_api_token) {
          this.userDao.getUserInfoByToken(user_api_token, loading).then(async (user) => {
            this.user = user;
            this.show = true;
            this.getValues(user_api_token);

            this.subscription.push(
              new Observable((observer) => {
                setInterval(() => {
                  observer.next();
                }, 1000);
              }).subscribe(() => {
                if (this.chart && this.chart.instance) {
                  this.chart.instance.render();
                }
                if (this.chart2 && this.chart2.instance) {
                  this.chart2.instance.render();
                }
                if (this.chart3 && this.chart3.instance) {
                  this.chart3.instance.render();
                }
                if (this.chart4 && this.chart4.instance) {
                  this.chart4.instance.render();
                }

                if (this.pie && this.pie.instance) {
                  this.pie.instance.render();
                }
                if (this.pie2 && this.pie2.instance) {
                  this.pie2.instance.render();
                }
                if (this.pie3 && this.pie3.instance) {
                  this.pie3.instance.render();
                }
                if (this.pie4 && this.pie4.instance) {
                  this.pie4.instance.render();
                }
                if (this.pie5 && this.pie5.instance) {
                  this.pie5.instance.render();
                }
              }));

            this.subscription.push(new Observable((observer: any) => {
              setInterval(() => {
                observer.next();
              }, 30000);
            }).subscribe(() => {
              if (navigator.onLine) {
                this.dashboardDao.get_call_center_sale_per_plans(user_api_token).then((sale_per_plans) => {
                  this.sale_per_plans = sale_per_plans;
                });

                this.dashboardDao.get_call_center_weekly_sales(user_api_token).then((w_sales) => {
                  this.weekly_sales = w_sales;
                });

                this.dashboardDao.get_call_center_monthly_sales(user_api_token).then((m_sales) => {
                  this.monthly_sales = m_sales;
                });

                this.dashboardDao.get_call_center_objective(user_api_token).then((cc_objective) => {
                  this.cc_objective = cc_objective;
                });

                this.dashboardDao.get_call_center_sale_per_origin(user_api_token).then((sale_per_origin) => {
                  this.sale_per_origin = sale_per_origin;
                });

                this.dashboardDao.get_team_sale_histogram(user_api_token).then((team_sale_histogram) => {
                  this.team_sale_histogram = team_sale_histogram;
                });

                this.dashboardDao.get_sale_state(user_api_token).then((sale_state) => {
                  this.sale_state = sale_state;
                });

                this.dashboardDao.get_sale_performance(user_api_token).then((sale_performance) => {
                  this.sale_performance = sale_performance;
                });
              }
            }));
            loading.dismiss();
          });
        } else {
          loading.dismiss();
          this.functions.presentAlert('É necessário fazer login para acessar esta página!', 'Alerta');
          this.router.navigateByUrl('login/logout');
        }
      });
    } catch {
      loading.dismiss();
    }
  }

  ionViewWillLeave() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    })
  }

  async getValues(user_api_token: string) {
    await this.dashboardDao.get_call_center_sale_per_plans(user_api_token).then((sale_per_plans) => {
      this.sale_per_plans = sale_per_plans;
    });

    await this.dashboardDao.get_call_center_weekly_sales(user_api_token).then((w_sales) => {
      this.weekly_sales = w_sales;
    });

    await this.dashboardDao.get_call_center_monthly_sales(user_api_token).then((m_sales) => {
      this.monthly_sales = m_sales;
    });

    await this.dashboardDao.get_call_center_objective(user_api_token).then((cc_objective) => {
      this.cc_objective = cc_objective;
    });

    await this.dashboardDao.get_call_center_sale_per_origin(user_api_token).then((sale_per_origin) => {
      this.sale_per_origin = sale_per_origin;
    });

    await this.dashboardDao.get_team_sale_histogram(user_api_token).then((team_sale_histogram) => {
      this.team_sale_histogram = team_sale_histogram;
    });

    await this.dashboardDao.get_sale_state(user_api_token).then((sale_state) => {
      this.sale_state = sale_state;
    });

    await this.dashboardDao.get_sale_performance(user_api_token).then((sale_performance) => {
      this.sale_performance = sale_performance;
    });
  }

  percentage(team: any) {
    let s = (Number(team.month_sales) * 100) / Number(team.month_objectives);
    if (s > 100) {
      return '100%';
    }
    return parseInt(s.toString(), 10) + '%';
  }

  prc(ranking: any) {
    let s = (Number(ranking.current_sales) * 100) / Number(ranking.month_sales);
    if (s > 100) {
      return 100;
    }
    return parseInt(s.toString(), 10);
  }

  /* DevExtreme Area */

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    let arg = e.target,
      item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

  customizeLabel(arg) {
    return Number(arg.value).toLocaleString('pt-BR') + ',00';
  }

  pipe: any = new PercentPipe("en-US");

  customizeTooltip(arg: any) {
    return {
      text: arg.valueText + " - " + this.pipe.transform(arg.percent, "1.2-2")
    };
  }
}
