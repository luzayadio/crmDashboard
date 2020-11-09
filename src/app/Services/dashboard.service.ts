import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Functions } from '../Utils/functions.service';
import { GlobalVariables } from '../Utils/globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private functions: Functions, private globalV: GlobalVariables) { }

  get_hot_leads_estatistics(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'hot_leads_estatistics', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_renewals_statistics(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'renewals_statistics', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_db_statistics(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'db_statistics', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_pie_lead_status_estatistics(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'pie_lead_status_estatistics', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  /* Call Center Agent */
  get_call_center_agents_ranking(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/ranking', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_call_center_sale_per_plans(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'sale_per_plans', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_call_center_weekly_sales(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'weekly_sales', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_call_center_monthly_sales(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'monthly_sales', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_call_center_objective(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'cc_objective', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_call_center_sale_per_origin(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'sale_per_origin', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_live_indicators(user_token: string, campaign_id: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/live_indicators', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('campaign_id', campaign_id)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_campaign_histogram(user_token: string, minute: number, campaign_id: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/campaign_histogram', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('minute', minute.toString()).set('campaign_id', campaign_id)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_team_sale_histogram(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/team/sale_histogram', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_sale_state(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/sale_state', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_sale_performance(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/sale_performance', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_leads_per_phese(user_token: string, origin_id: number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/leads_per_phese', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('origin_id', origin_id.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_qualified_per_state(user_token: string, origin_id: number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/qualified_per_state', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('origin_id', origin_id.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_finalized_per_state(user_token: string, origin_id: number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/finalized_per_state', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('origin_id', origin_id.toString())
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_db_contacts_per_reference(user_token: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/db_contacts_per_reference', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_qualified_calls(user_token: string, date_from: any = null, date_to: any = null): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/qualified_calls', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        // this.functions.errorStatus(error);
      });
    });
  }

  get_agentTimeConvertion(user_token: string, loading?, date_from = null, date_to = null, agents = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'report/monthly/agentTimeConvertion', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to).set('agents', agents)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_waitTimeAverageAnsweredCalls(user_token: string, loading?, date_from = null, date_to = null, campaign_id = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'report/monthly/waitTimeAverageAnsweredCalls', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to).set('campaign_id', campaign_id)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_waitTimeAverageNotAnsweredCalls(user_token: string, loading?, date_from = null, date_to = null, campaign_id = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'report/monthly/waitTimeAverageNotAnsweredCalls', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to).set('campaign_id', campaign_id)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_hourConventionCalls(user_token: string, loading?, date_from = null, date_to = null, campaign_id = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'report/hourConventionCalls', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to).set('campaign_id', campaign_id)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_dailyOutboundCalls(user_token: string, loading?, date_from = null, date_to = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'report/dailyOutboundCalls', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_agentsOutboundCalls(user_token: string, loading?, date_from = null, date_to = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'report/agentsOutboundCalls', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_saleCalls(user_token: string, loading?, date_from = null, date_to = null, agents = null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'report/saleCalls', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token),
        params: new HttpParams().set('date_from', date_from).set('date_to', date_to).set('agents', agents)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_global(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/global', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_topSallers(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/topSallers', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_topQualifications(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/topQualifications', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_agentStatus(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/agentStatus', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_campaignAgents(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/campaignAgents', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_inboundStatus(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/inboundStatus', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_outboundStatus(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/outboundStatus', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_campaignTimes(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/campaignTimes', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

  get_microCampaign_1(user_token: string, loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'wallboard/microCampaign_1', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-sfa-key', user_token)
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        // this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

}
