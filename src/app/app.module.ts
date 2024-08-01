import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './feature/pages/login/login.component';
import { ListClientsComponent } from './feature/pages/list-clients/list-clients.component';
import { EditClientComponent } from './feature/pages/edit-client/edit-client.component';
import { NewClientComponent } from './feature/pages/new-client/new-client.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListClientsComponent,
    EditClientComponent,
    NewClientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatDividerModule,
    MatIconModule

  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
