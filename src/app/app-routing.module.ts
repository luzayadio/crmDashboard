import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "login/:logout",
    loadChildren: "./login/login.module#LoginPageModule",
  },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  {
    path: "not-authorized",
    loadChildren:
      "./not-authorized/not-authorized.module#NotAuthorizedPageModule",
  },


  // Call Center Admin Role
  {
    path: "CallCenterAdmin/dashboard",
    loadChildren:
      "./CallCenterAdmin/dashboard/dashboard.module#DashboardPageModule",
  },
  {
    path: "CallCenterAdmin/dashboard-analyze",
    loadChildren:
      "./CallCenterAdmin/dashboard-analyze/dashboard-analyze.module#DashboardAnalyzePageModule",
  },
  {
    path: "CallCenterAdmin/wallboard",
    loadChildren:
      "./CallCenterAdmin/wallboard/wallboard.module#WallboardPageModule",
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
