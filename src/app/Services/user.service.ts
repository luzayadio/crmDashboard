import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Functions } from '../Utils/functions.service';
import { GlobalVariables } from '../Utils/globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private functions: Functions, private globalV: GlobalVariables) { }

  getUsers(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'users', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  getUsersGrouped(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'users/grouped', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  getUsersByRoleId(user_role_id: number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'roles/' + user_role_id + "/users", {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  getByExtension(user_extension: number, showError: Boolean = true): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'me', {
        headers: new HttpHeaders().set('x-user-extension', user_extension.toString()).set('Content-Type', 'application/json'),
        params: new HttpParams().set('user_extension', user_extension.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (showError) { this.functions.errorStatus(error); }
      });
    });
  }

  getUserRolesByUserId(user_id: number, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'users/' + user_id + '/roles', {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss(); }
        this.functions.errorStatus(error);
      });
    });
  }

  getTasksSchedule(user_extension: number, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'tasks_schedule', {
        headers: new HttpHeaders().set('x-user-extension', user_extension.toString()).set('Content-Type', 'application/json'),
        params: new HttpParams().set('user_extension', user_extension.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  userLogin(user: any, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.globalV.apiUrl + 'login', JSON.stringify(user), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  getUserInfoByToken(user_token: string, loading?: any, checkinError: boolean = false): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'loged_user', {
        headers: new HttpHeaders().set('x-sfa-key', user_token.toString()).set('Content-Type', 'application/json').set('x-skip-checkin', 'true')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        console.log(checkinError);
        this.functions.errorStatus(error, checkinError);
      });
    });
  }

  // Get User Menu Items
  getUserMenuItems(user_token: string, loading?: any, checkinError: boolean = false): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'my_menu_items', {
        headers: new HttpHeaders().set('x-sfa-key', user_token.toString()).set('Content-Type', 'application/json').set('x-skip-checkin', 'true')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error, checkinError);
      });
    });
  }

  // Get Campaign Results
  getCampaignResultsFilter(user_token: string, date_from: any = null, date_to: any = null, status: any = null, phone: any = null, customer_name: any = null, extension: any = null, campaign_id: any = null, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'campaign_results', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json'),
        params: new HttpParams().set('status', status).set('phone', phone).set('customer_name', customer_name).set('extension', extension)
          .set('campaign_id', campaign_id).set('date_from', date_from).set('date_to', date_to)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  // Get Campaign Results
  getLiveAgents(user_token: string, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'live_agents', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  // Call Center Agents
  getCallCenterAgents(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'callcenter_agents', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss(); }
        this.functions.errorStatus(error);
      });
    });
  }

  // Get Campaign Results
  get_call_monitor(user_token: string, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'call_monitor', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json').set('x-skip-checkin', 'true')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        // this.functions.errorStatus(error);
        console.log(error);
      });
    });
  }

  // Get Inbound Agents
  get_inbound_agents(user_token: string, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'inbound_agents', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json').set('x-skip-checkin', 'true')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  // My Agents Campaign Action
  agents_campaign_action(user_token: string, action: string, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.globalV.apiUrl + 'agents_campaign_action', '', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json').set('x-skip-checkin', 'true'),
        params: new HttpParams().set('action', action)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  // My Campaign Action
  my_campaign_action(user_token: string, action: string, user_id: number, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.globalV.apiUrl + 'my_campaign_action', '', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json').set('x-skip-checkin', 'true'),
        params: new HttpParams().set('action', action).set('user_id', user_id.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  // Campaign Agents
  campaign_agents(user_token: string, user_call_campaign_id: number, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'campaign_agents', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json').set('x-skip-checkin', 'true'),
        params: new HttpParams().set('user_call_campaign_id', user_call_campaign_id.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  // Avalible Campaign Agents
  avalible_campaign_agents(user_token: string, user_call_campaign_id: number, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'avalible_campaign_agents', {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json').set('x-skip-checkin', 'true'),
        params: new HttpParams().set('user_call_campaign_id', user_call_campaign_id.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  // Edit Campaign Agents
  edit_campaign_agents(user_token: string, user_id: number, body: any, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.put(this.globalV.apiUrl + 'users/' + user_id, JSON.stringify(body), {
        headers: new HttpHeaders().set('x-sfa-key', user_token).set('Content-Type', 'application/json').set('x-skip-checkin', 'true'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
      });
    });
  }

  getTeamAgents(user_token: string, loading?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'user_groups', {
        headers: new HttpHeaders().set('x-sfa-key', user_token.toString()).set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  getTeamAgentsById(user_token: string, user_group_id: number, loading?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'user_groups/' + user_group_id, {
        headers: new HttpHeaders().set('x-sfa-key', user_token.toString()).set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  getTeamAgentsAvailable(user_token: string, loading?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'user_groups/avalible_users', {
        headers: new HttpHeaders().set('x-sfa-key', user_token.toString()).set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  updateTeamAgents(user_token: string, user_group_id: number, group: any, loading?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.globalV.apiUrl + 'user_groups/' + user_group_id, JSON.stringify(group), {
        headers: new HttpHeaders().set('x-sfa-key', user_token.toString()).set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  creatTeamAgents(user_token: string, group: any, loading?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.globalV.apiUrl + 'user_groups', JSON.stringify(group), {
        headers: new HttpHeaders().set('x-sfa-key', user_token.toString()).set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) {
          loading.dismiss();
        }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

}
