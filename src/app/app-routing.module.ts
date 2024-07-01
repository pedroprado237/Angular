import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/pages/login/login.component';
import { ListClientsComponent } from './feature/pages/list-clients/list-clients.component';
import { EditClientComponent } from './feature/pages/edit-client/edit-client.component';
import { NewClientComponent } from './feature/pages/new-client/new-client.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ListClientsComponent },
  { path: 'editClient', component: EditClientComponent },
  { path: 'newClient', component: NewClientComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
