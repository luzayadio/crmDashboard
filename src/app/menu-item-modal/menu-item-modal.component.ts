import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { Functions } from '../Utils/functions.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { FlatTreeControl } from '@angular/cdk/tree';

interface FoodNode {
  menu_item_id?: number;
  parent_id?: number;
  name: string;
  icone: string;
  url?: string;
  page_code?: string;
  sort_order: number;
  visible: number;
  active: number;
  children?: any[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  icone: string;
  level: number;
}

@Component({
  selector: 'app-menu-item-modal',
  templateUrl: './menu-item-modal.component.html',
  styleUrls: ['./menu-item-modal.component.scss'],
})
export class MenuItemModalComponent implements OnInit {
  @Input() active_url: string = '';
  user: any = undefined;
  menu_items: any[] = [
    {
      "menu_item_id": 43,
      "name": "Wallboard",
      "icone": "chalkboard-teacher",
      "url": "/CallCenterAdmin/wallboard",
      "page_code": "CCA-013",
      "active": 1,
      "visible": 1,
      "sort_order": 1,
      "children": []
    },
    {
      "menu_item_id": 29,
      "name": "Dashboard de Contactos",
      "icone": "chart-bar",
      "url": "/CallCenterAdmin/dashboard-analyze",
      "page_code": "CCA-008",
      "active": 1,
      "visible": 1,
      "sort_order": 0,
      "children": []
    },
    {
      "menu_item_id": 24,
      "name": "Dashboard Vendas",
      "icone": "balance-scale",
      "url": "/CallCenterAdmin/dashboard",
      "page_code": "CA-007",
      "active": 1,
      "visible": 1,
      "sort_order": 2,
      "children": []
    },
    {
      "menu_item_id": 9,
      "name": "Logout",
      "icone": "sign-out-alt",
      "url": "/login/logout",
      "page_code": "LG-001",
      "active": 1,
      "visible": 1,
      "sort_order": 100,
      "children": []
    }
  ];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name ? node.name : node.name,
      icone: node.icone ? node.icone : node.icone,
      level: level,
      data: node
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(private storage: Storage, public loadingController: LoadingController,
    private userDao: UserService, private router: Router, public functions: Functions) { }

  async ngOnInit() {
    this.storage.get('user_token').then(async (user_api_token) => {
      if (user_api_token) {
        await this.userDao.getUserInfoByToken(user_api_token).then(async (user) => {
          this.user = user;
          this.dataSource.data = this.menu_items;
        });
      } else {
        this.functions.presentAlert('É necessário fazer login para acessar esta página!', 'Alerta');
        this.router.navigateByUrl('login/logout');
      }
    });
  }

  onRouter(menu_item: any) {
    if (menu_item.page_code === 'whatsapp') {
      this.functions.openWhatsApp();
    } else {
      if (menu_item.url && menu_item.url !== '') this.router.navigateByUrl(menu_item.url);
    }
  }

  verify(url: string, array: any[]) {
    const s: any = array.find((m) => { return m.url === url });
    if (s) {
      return s.url;
    } else {
      return '';
    }
  }
}
