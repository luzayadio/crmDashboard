import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Functions } from '../Utils/functions.service';
import { GlobalVariables } from '../Utils/globalVariables.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient, private functions: Functions, private globalV: GlobalVariables) { }

  // Civil States
  get_civil_states(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'civil_state_types', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  // Gender Type
  get_gender_types(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'gender_types', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  // E-mail Templates
  get_email_tamplates(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'email_tamplates', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  // SMS Templates
  get_sms_tamplates(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'sms_tamplates', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  // Origem Generica
  get_generic_origin(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'generic_origins', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss(); }
        this.functions.errorStatus(error);
      });
    });
  }

  // Origem Generica
  get_lead_status(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'lead_status', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss(); }
        this.functions.errorStatus(error);
      });
    });
  }

  // Campanha
  get_campaigns(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'cdr_campaigns', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  // Estado da Chamada
  get_cdr_status(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'cdr_status', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss(); }
        this.functions.errorStatus(error);
      });
    });
  }

  // Payment Method
  getPaymentMethod(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'payment_methods', {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        this.functions.errorStatus(error);
      });
    });
  }

  // Payment Status
  get_payment_status(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'payment_status', {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // Sale Contract Status
  get_sale_contract_status(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'sale_contract_status', {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // Advertising Campagne List
  get_advertising_campaigns(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'advertising_campaigns', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // Campagne List
  get_campaign_channels(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'campaign_channels', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // Campagne Period
  get_campaign_periods(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'campaign_periods', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // Campagne Programs
  get_campaign_programs(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'campaign_programs', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // Campagne Ambassadors
  get_campaign_ambassadors(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'campaign_ambassadors', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // USer Call Campaign
  get_user_call_campaigns(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'user_call_campaigns', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // Call Result Types
  get_call_result_types(extension: string, loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'call_result/types', {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('x-user-extension', extension),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // USer Call Campaign
  get_ict_campaign(loading?: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.globalV.apiUrl + 'dashboard/campaign/inbound', {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss }
        this.functions.errorStatus(error);
      });
    });
  }

  // disponibility_locations
  get_disponibility_locations(loading?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.globalV.apiUrl + 'disponibility_locations', {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(data => {
        resolve(data);
      }, error => {
        if (loading) { loading.dismiss() }
        this.functions.errorStatus(error);
        reject(error)
      });
    });
  }

}
