import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthComponent } from './layouts/auth/auth.component';
import { InsideComponent } from './layouts/inside/inside.component';
import { TeamHomeResolver } from './resolvers/team-home.resolver';
import { TestComponent } from './test/test/test.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { DashboardComponent } from './views/inside/team-home/dashboard/dashboard.component';
import { ListComponent } from './views/inside/team-home/list/list.component';
import { TeamHomeComponent } from './layouts/team-home/team-home.component';
import { TeamsManagmentComponent } from './views/inside/teams-managment/teams-managment.component';
import { PeopleComponent } from './views/inside/people/people.component';

const routes: Routes = [

  {
    path: "inside",
    component: InsideComponent, runGuardsAndResolvers: 'always', canActivate: [AuthorizationGuard],
    children: [
      { path: "teams-managment", component: TeamsManagmentComponent,
      children:[]
      },
      { path: "people", component: PeopleComponent},
      { path: "team-home/:id",  resolve: {team: TeamHomeResolver}, component: TeamHomeComponent,
      children:[
        { path: "dashboard", component: DashboardComponent},
        { path: "list", component: ListComponent},
        { path: "TestComponent", component: TestComponent},
        { path: "", redirectTo: "dashboard", pathMatch: "full" },
      ]},
      { path: "", redirectTo: "teams-managment", pathMatch: "full" },
    ],
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "**", redirectTo: "auth", pathMatch: "full" },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
