import { Component, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Functions } from 'src/app/Utils/functions.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DxChartComponent } from 'devextreme-angular';
import { TypeService } from 'src/app/Services/type.service';

@Component({
  selector: 'app-wallboard',
  templateUrl: './wallboard.page.html',
  styleUrls: ['./wallboard.page.scss'],
})
export class WallboardPage {
  show: boolean = false;
  user: any = undefined;
  global: any = undefined;
  topSallers: any = undefined;
  topQualifications: any = undefined;
  agentStatus: any[] = undefined;
  campaignAgents: any = undefined;
  inboundStatus: any = undefined;
  outboundStatus: any = undefined;
  campaignTimes: any = undefined;
  get_microCampaign_1: any = undefined;
  subscription: any[] = [];
  minute: number = 1;
  campaignForm = new FormControl('null');
  campaign_histogram: any[] = [];
  campaign_id: string = 'null';
  @ViewChild(DxChartComponent, {}) chart: DxChartComponent;
  user_call_campaigns: any[] = [];

  constructor(public loadingController: LoadingController, private storage: Storage,
    private router: Router, private userDao: UserService, public functions: Functions,
    private dashboardDao: DashboardService, private typeDao: TypeService) { }

  async ionViewDidEnter() {
    const loading = await this.loadingController.create({
      message: 'A carregar os dados...'
    });
    await loading.present();
    try {
      this.storage.get('user_token').then(async (user_api_token) => {
        if (user_api_token) {
          await this.userDao.getUserInfoByToken(user_api_token, loading).then(async (user) => {
            this.user = user;
            this.show = await true;
            this.typeDao.get_ict_campaign(loading).then((user_call_campaigns) => {
              this.user_call_campaigns = user_call_campaigns;
              this.user_call_campaigns.unshift({
                campaign_id: 'null',
                name: '-- Todas --'
              });
            });
            await this.dashboardDao.get_global(user_api_token, loading).then((global) => {
              this.global = global;
            });
            await this.dashboardDao.get_topSallers(user_api_token, loading).then((topSallers) => {
              this.topSallers = topSallers;
            });
            await this.dashboardDao.get_topQualifications(user_api_token, loading).then((topQualifications) => {
              this.topQualifications = topQualifications;
            });
            await this.dashboardDao.get_agentStatus(user_api_token, loading).then((agentStatus) => {
              this.agentStatus = agentStatus;
            });
            await this.dashboardDao.get_campaignAgents(user_api_token, loading).then((campaignAgents) => {
              this.campaignAgents = campaignAgents;
            });
            await this.dashboardDao.get_inboundStatus(user_api_token, loading).then((inboundStatus) => {
              this.inboundStatus = inboundStatus;
            });
            await this.dashboardDao.get_outboundStatus(user_api_token, loading).then((outboundStatus) => {
              this.outboundStatus = outboundStatus;
            });
            await this.dashboardDao.get_campaignTimes(user_api_token, loading).then((campaignTimes) => {
              this.campaignTimes = campaignTimes;
            });
            await this.dashboardDao.get_microCampaign_1(user_api_token, loading).then((get_microCampaign_1) => {
              this.get_microCampaign_1 = get_microCampaign_1;
            });
            await this.dashboardDao.get_campaign_histogram(user_api_token, this.minute, this.campaign_id).then((histogram) => {
              this.campaign_histogram = histogram;
            });
            loading.dismiss();
            this.subscription.push(new Observable((observer) => {
              setInterval(async () => {
                observer.next();
              }, 1000);
            }).subscribe(() => {
              if (this.chart && this.chart.instance)
                this.chart.instance.render();
            }));
            this.subscription.push(new Observable((observer) => {
              setInterval(() => {
                observer.next();
              }, 30000);
            }).subscribe(async () => {
              if (navigator.onLine) {
                await this.dashboardDao.get_global(user_api_token, loading).then(async (global) => {
                  this.global = await global;
                });
                await this.dashboardDao.get_topSallers(user_api_token, loading).then(async (topSallers) => {
                  this.topSallers = await topSallers;
                });
                await this.dashboardDao.get_topQualifications(user_api_token, loading).then(async (topQualifications) => {
                  this.topQualifications = await topQualifications;
                });
                await this.dashboardDao.get_agentStatus(user_api_token, loading).then(async (agentStatus) => {
                  this.agentStatus = await agentStatus;
                });
                await this.dashboardDao.get_campaignAgents(user_api_token, loading).then(async (campaignAgents) => {
                  this.campaignAgents = await campaignAgents;
                });
                await this.dashboardDao.get_inboundStatus(user_api_token, loading).then(async (inboundStatus) => {
                  this.inboundStatus = await inboundStatus;
                });
                await this.dashboardDao.get_outboundStatus(user_api_token, loading).then(async (outboundStatus) => {
                  this.outboundStatus = await outboundStatus;
                });
                await this.dashboardDao.get_campaignTimes(user_api_token, loading).then(async (campaignTimes) => {
                  this.campaignTimes = await campaignTimes;
                });
                await this.dashboardDao.get_microCampaign_1(user_api_token, loading).then(async (get_microCampaign_1) => {
                  this.get_microCampaign_1 = await get_microCampaign_1;
                });
                await this.dashboardDao.get_campaign_histogram(user_api_token, this.minute, this.campaign_id).then(async (histogram) => {
                  this.campaign_histogram = await histogram;
                });
              }
            }));
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
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getInterval(agent: any) {
    if (agent.interval_type) {
      return agent.interval_name + ' ' + this.functions.momentRelative(agent.interval_started_at);
    } else {
      return 'Checked-Out';
    }
  }

  getStatus(agent: any) {
    if (agent.agent_status && agent.agent_update) {
      if (agent.agent_status === 'loggedoff')
        return 'Offline ' + this.functions.momentRelative(agent.agent_update);
      if (agent.agent_status === 'unavailable')
        return 'Not Ready ' + this.functions.momentRelative(agent.agent_update);
      if (agent.agent_status === 'available')
        return 'Ready ' + this.functions.momentRelative(agent.agent_update);
      if (agent.agent_status === 'incall')
        return 'In Call ' + this.functions.momentRelative(agent.agent_update);
      else
        return agent.agent_status + ' ' + this.functions.momentRelative(agent.agent_update);
    } else {
      return '';
    }
  }

  async set_minute(minute: number) {
    this.minute = minute;
    await this.dashboardDao.get_campaign_histogram(this.user.api_token, this.minute, this.campaign_id).then(async (histogram) => {
      this.campaign_histogram = await histogram;
    });
  }

  onStatusChange(event) {
    this.campaign_id = event;
    if (navigator.onLine) {
      this.dashboardDao.get_campaign_histogram(this.user.api_token, this.minute, this.campaign_id).then((histogram) => {
        this.campaign_histogram = histogram;
      });
    }
  }
}
