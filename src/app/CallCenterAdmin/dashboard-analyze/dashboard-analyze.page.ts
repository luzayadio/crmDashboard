import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from '@ionic/angular';
import { Functions } from '../../Utils/functions.service';
import { UserService } from '../../Services/user.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Subscription, Observable } from 'rxjs';
import { DxPieChartComponent } from 'devextreme-angular';
import { MatTableDataSource, MatCheckbox } from '@angular/material';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard-analyze',
  templateUrl: './dashboard-analyze.page.html',
  styleUrls: ['./dashboard-analyze.page.scss'],
})
export class DashboardAnalyzePage {
  user: any = undefined;
  show: boolean = false;
  subscription: Subscription[] = [];
  datasource_leads_per_phese: any[] = [{
    base_de_dados: [],
    renovacoes: [],
    leads_comercias: [],
    media: [],
    geral: [],
    desconhecida: [],
    netaff: [],
    whatsapp: [],
    referencia: []
  }];
  datasource_qualified_per_state: any[] = [{
    base_de_dados: [],
    renovacoes: [],
    leads_comercias: [],
    media: [],
    geral: [],
    desconhecida: [],
    netaff: [],
    whatsapp: [],
    referencia: []
  }];
  datasource_finalized_per_state: any[] = [{
    base_de_dados: [],
    renovacoes: [],
    leads_comercias: [],
    media: [],
    geral: [],
    desconhecida: [],
    netaff: [],
    whatsapp: [],
    referencia: []
  }];
  db_contacts_per_reference: any;
  db_contacts_per_reference_selected: any = undefined;
  @ViewChild(DxPieChartComponent, {}) pie: DxPieChartComponent;
  @ViewChild('pie2', {}) pie2: DxPieChartComponent;
  @ViewChild('pie3', {}) pie3: DxPieChartComponent;
  @ViewChild('pie4', {}) pie4: DxPieChartComponent;
  @ViewChild('pie5', {}) pie5: DxPieChartComponent;
  @ViewChild('pie6', {}) pie6: DxPieChartComponent;
  @ViewChild('pie7', {}) pie7: DxPieChartComponent;
  @ViewChild('pie8', {}) pie8: DxPieChartComponent;
  @ViewChild('pie9', {}) pie9: DxPieChartComponent;
  displayedColumns: string[] = ['label', 'lead_count'];
  refdisplayedColumns: string[] = ['ref_id', 'ref_count', 'created_at', 'action'];

  @ViewChild('TABLE_qps_bd') table_qps_bd: ElementRef;
  @ViewChild('TABLE_fps_bd') table_fps_bd: ElementRef;

  @ViewChild('qps_bd') qps_bd: MatCheckbox;

  constructor(public loadingController: LoadingController, private router: Router,
    private storage: Storage, private userDao: UserService, public functions: Functions,
    public alertController: AlertController, private dashboardDao: DashboardService) { }

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

            this.getFirsValues(loading);

            await this.subscription.push(
              new Observable((observer) => {
                setInterval(() => {
                  observer.next();
                }, 1000);
              }).subscribe(() => {
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
                if (this.pie6 && this.pie6.instance) {
                  this.pie6.instance.render();
                }
                if (this.pie7 && this.pie7.instance) {
                  this.pie7.instance.render();
                }
                if (this.pie8 && this.pie8.instance) {
                  this.pie8.instance.render();
                }
                if (this.pie9 && this.pie9.instance) {
                  this.pie9.instance.render();
                }
              }));

            await this.subscription.push(
              new Observable((observer) => {
                setInterval(async () => {
                  observer.next();
                }, 50000);
              }).subscribe(async () => {
                if (navigator.onLine) {
                  /* Leads Per Phese */
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 1).then((base_de_dados) => {
                    this.datasource_leads_per_phese['base_de_dados'] = base_de_dados;
                  });
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 2).then((renovacoes) => {
                    this.datasource_leads_per_phese['renovacoes'] = renovacoes;
                  });
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 3).then((leads_comercias) => {
                    this.datasource_leads_per_phese['leads_comercias'] = leads_comercias;
                  });
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 5).then((media) => {
                    this.datasource_leads_per_phese['media'] = media;
                  });
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 7).then((geral) => {
                    this.datasource_leads_per_phese['geral'] = geral;
                  });
                  // await this.dashboardDao.get_leads_per_phese(this.user.api_token, 8).then((desconhecida) => {
                  //   this.datasource_leads_per_phese['desconhecida'] = desconhecida;
                  // });
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 9).then((netaff) => {
                    this.datasource_leads_per_phese['netaff'] = netaff;
                  });
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 10).then((whatsapp) => {
                    this.datasource_leads_per_phese['whatsapp'] = whatsapp;
                  });
                  await this.dashboardDao.get_leads_per_phese(this.user.api_token, 11).then((referencia) => {
                    this.datasource_leads_per_phese['referencia'] = referencia;
                  });

                  /* Db Contacts Per Reference */
                  this.dashboardDao.get_db_contacts_per_reference(this.user.api_token).then((contacts_per_reference: any) => {
                    this.db_contacts_per_reference = new MatTableDataSource<any>(contacts_per_reference);
                  });
                }

                /* Qualified Per State */
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 1).then((base_de_dados) => {
                  this.datasource_qualified_per_state['base_de_dados'] = new MatTableDataSource<any>(base_de_dados);
                });
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 2).then((renovacoes) => {
                  this.datasource_qualified_per_state['renovacoes'] = new MatTableDataSource<any>(renovacoes);
                });
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 3).then((leads_comercias) => {
                  this.datasource_qualified_per_state['leads_comercias'] = new MatTableDataSource<any>(leads_comercias);
                });
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 5).then((media) => {
                  this.datasource_qualified_per_state['media'] = new MatTableDataSource<any>(media);
                });
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 7).then((geral) => {
                  this.datasource_qualified_per_state['geral'] = new MatTableDataSource<any>(geral);
                });
                // await this.dashboardDao.get_qualified_per_state(this.user.api_token, 8).then((desconhecida) => {
                // this.datasource_qualified_per_state['desconhecida'] = new MatTableDataSource<any>(desconhecida);
                // });
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 9).then((netaff) => {
                  this.datasource_qualified_per_state['netaff'] = new MatTableDataSource<any>(netaff);
                });
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 10).then((whatsapp) => {
                  this.datasource_qualified_per_state['whatsapp'] = new MatTableDataSource<any>(whatsapp);
                });
                await this.dashboardDao.get_qualified_per_state(this.user.api_token, 11).then((referencia) => {
                  this.datasource_qualified_per_state['referencia'] = new MatTableDataSource<any>(referencia);
                });

                /* Finalized Per State */
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 1).then((base_de_dados) => {
                  this.datasource_finalized_per_state['base_de_dados'] = new MatTableDataSource<any>(base_de_dados);
                });
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 2).then((renovacoes) => {
                  this.datasource_finalized_per_state['renovacoes'] = new MatTableDataSource<any>(renovacoes);
                });
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 3).then((leads_comercias) => {
                  this.datasource_finalized_per_state['leads_comercias'] = new MatTableDataSource<any>(leads_comercias);
                });
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 5).then((media) => {
                  this.datasource_finalized_per_state['media'] = new MatTableDataSource<any>(media);
                });
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 7).then((geral) => {
                  this.datasource_finalized_per_state['geral'] = new MatTableDataSource<any>(geral);
                });
                // await this.dashboardDao.get_finalized_per_state(this.user.api_token, 8).then((desconhecida) => {
                //   this.datasource_finalized_per_state['desconhecida'] = new MatTableDataSource<any>(desconhecida);
                // });
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 9).then((netaff) => {
                  this.datasource_finalized_per_state['netaff'] = new MatTableDataSource<any>(netaff);
                });
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 10).then((whatsapp) => {
                  this.datasource_finalized_per_state['whatsapp'] = new MatTableDataSource<any>(whatsapp);
                });
                await this.dashboardDao.get_finalized_per_state(this.user.api_token, 11).then((referencia) => {
                  this.datasource_finalized_per_state['referencia'] = new MatTableDataSource<any>(referencia);
                });
              })
            );
            // loading.dismiss();
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

  async getFirsValues(loading: any) {
    /* Leads Per Phese */
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 1).then((base_de_dados) => {
      this.datasource_leads_per_phese['base_de_dados'] = base_de_dados;
    });
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 2).then((renovacoes) => {
      this.datasource_leads_per_phese['renovacoes'] = renovacoes;
    });
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 3).then((leads_comercias) => {
      this.datasource_leads_per_phese['leads_comercias'] = leads_comercias;
    });
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 5).then((media) => {
      this.datasource_leads_per_phese['media'] = media;
    });
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 7).then((geral) => {
      this.datasource_leads_per_phese['geral'] = geral;
    });
    // await this.dashboardDao.get_leads_per_phese(this.user.api_token, 8).then((desconhecida) => {
    //   this.datasource_leads_per_phese['desconhecida'] = desconhecida;
    // });
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 9).then((netaff) => {
      this.datasource_leads_per_phese['netaff'] = netaff;
    });
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 10).then((whatsapp) => {
      this.datasource_leads_per_phese['whatsapp'] = whatsapp;
    });
    await this.dashboardDao.get_leads_per_phese(this.user.api_token, 11).then((referencia) => {
      this.datasource_leads_per_phese['referencia'] = referencia;
    });

    this.dashboardDao.get_db_contacts_per_reference(this.user.api_token).then((contacts_per_reference: any) => {
      this.db_contacts_per_reference = new MatTableDataSource<any>(contacts_per_reference);
      this.storage.get('db_contacts_per_reference_selected').then((db) => {
        if (db) {
          this.db_contacts_per_reference_selected = db;
        } else {
          const first_db = this.db_contacts_per_reference[0];
          this.storage.set('db_contacts_per_reference_selected', first_db);
          this.db_contacts_per_reference_selected = first_db;
        }
      });
    });

    /* Qualified Per State */
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 1).then((base_de_dados) => {
      this.datasource_qualified_per_state['base_de_dados'] = new MatTableDataSource<any>(base_de_dados);
    });
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 2).then((renovacoes) => {
      this.datasource_qualified_per_state['renovacoes'] = new MatTableDataSource<any>(renovacoes);
    });
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 3).then((leads_comercias) => {
      this.datasource_qualified_per_state['leads_comercias'] = new MatTableDataSource<any>(leads_comercias);
    });
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 5).then((media) => {
      this.datasource_qualified_per_state['media'] = new MatTableDataSource<any>(media);
    });
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 7).then((geral) => {
      this.datasource_qualified_per_state['geral'] = new MatTableDataSource<any>(geral);
    });
    // await this.dashboardDao.get_qualified_per_state(this.user.api_token, 8).then((desconhecida) => {
    //   this.datasource_qualified_per_state['desconhecida'] = desconhecida;
    // });
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 9).then((netaff) => {
      this.datasource_qualified_per_state['netaff'] = new MatTableDataSource<any>(netaff);
    });
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 10).then((whatsapp) => {
      this.datasource_qualified_per_state['whatsapp'] = new MatTableDataSource<any>(whatsapp);
    });
    await this.dashboardDao.get_qualified_per_state(this.user.api_token, 11).then((referencia) => {
      this.datasource_qualified_per_state['referencia'] = new MatTableDataSource<any>(referencia);
    });

    /* Finalized Per State */
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 1).then((base_de_dados) => {
      this.datasource_finalized_per_state['base_de_dados'] = new MatTableDataSource<any>(base_de_dados);
    });
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 2).then((renovacoes) => {
      this.datasource_finalized_per_state['renovacoes'] = new MatTableDataSource<any>(renovacoes);
    });
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 3).then((leads_comercias) => {
      this.datasource_finalized_per_state['leads_comercias'] = new MatTableDataSource<any>(leads_comercias);
    });
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 5).then((media) => {
      this.datasource_finalized_per_state['media'] = new MatTableDataSource<any>(media);
    });
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 7).then((geral) => {
      this.datasource_finalized_per_state['geral'] = new MatTableDataSource<any>(geral);
    });
    // await this.dashboardDao.get_finalized_per_state(this.user.api_token, 8).then((desconhecida) => {
    //   this.datasource_finalized_per_state['desconhecida'] = desconhecida;
    // });
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 9).then((netaff) => {
      this.datasource_finalized_per_state['netaff'] = new MatTableDataSource<any>(netaff);
    });
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 10).then((whatsapp) => {
      this.datasource_finalized_per_state['whatsapp'] = new MatTableDataSource<any>(whatsapp);
    });
    await this.dashboardDao.get_finalized_per_state(this.user.api_token, 11).then((referencia) => {
      this.datasource_finalized_per_state['referencia'] = new MatTableDataSource<any>(referencia);
    });

    loading.dismiss();
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
    return Number(arg.value).toLocaleString('pt-BR');
  }

  customizeTableLabel(value) {
    return Number(value).toLocaleString('pt-BR');
  }

  /* Fim */
  onReferenceClicked(ref_id: string) {
    const selected = this.db_contacts_per_reference.data.find((d) => d.ref_id === ref_id);
    if (selected && selected.data_per_state) {
      this.db_contacts_per_reference_selected = selected;
      this.storage.set('db_contacts_per_reference_selected_dash', selected);
    }
  }

  ExportTOExcel() {
    // if (this.qps_bd.checked) {

    // }


    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table_qps_bd.nativeElement);

    // XLSX.utils.table_to_sheet(this.table_fps_bd.nativeElement);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    XLSX.writeFile(wb, 'leads_dashboard_' + new Date(Date.now()) + '.xlsx');
  }
}
