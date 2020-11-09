import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalVariables {
    //This is a global variables services
    // readonly apiUrl: string = 'http://crm-api.voip.platiniumangola.test/';
    // readonly appUrl: string = 'http://localhost:8100/#/';
    readonly apiUrl: string = 'https://crm-api.voip.platiniumangola.co.ao/';
    readonly appUrl: string = 'https://crm.voip.platiniumangola.co.ao/#/';

    // This is a static values
    readonly training_groups_status: any[] = [
        {
            name: 'Fechado',
            value: 0
        },
        {
            name: 'Aberto',
            value: 1
        }
    ];

    readonly trainees_status: any[] = [{
        name: 'Apto',
        value: 1,
        color: 'success'
    }, {
        name: 'N/Apto',
        value: 2,
        color: 'danger'
    }, {
        name: 'Desistente',
        value: 3,
        color: 'warning'
    }];

    readonly evaluations: any[] = [{
        name: 'Insuficiente',
        value: 1
    }, {
        name: 'Médio',
        value: 2
    }, {
        name: 'Bom',
        value: 3
    }];

    readonly target_areas: any[] = [{
        name: 'Call Center',
        value: 1
    }, {
        name: 'Door-To-Door',
        value: 2
    }, {
        name: 'Stand',
        value: 3
    }, {
        name: 'Parceiros',
        value: 4
    }];

}
