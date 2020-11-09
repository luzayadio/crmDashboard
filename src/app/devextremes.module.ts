import { NgModule } from "@angular/core";
import {
  DxPieChartModule,
  DxChartModule,
  DxoLabelModule,
  DxoTooltipModule,
  DxoArgumentAxisModule,
  DxSelectBoxModule,
  DxPopoverModule,
  DxButtonModule,
  DxTemplateModule,
  DxListModule
} from "devextreme-angular";

@NgModule({
  exports: [
    DxPieChartModule,
    DxChartModule,
    DxoTooltipModule,
    DxoLabelModule,
    DxoArgumentAxisModule,
    DxSelectBoxModule,
    DxPopoverModule,
    DxButtonModule,
    DxTemplateModule,
    DxListModule
  ]
})
export class DevExtremesModule { }
