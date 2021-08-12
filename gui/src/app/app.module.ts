import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastroService } from './cadastro/cadastro.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MinhaContaComponent } from './minha_conta/minha_conta.component';
import { MinhaContaService } from './minha_conta/minha_conta.service';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CadastroComponent,
    LoginComponent,
    MinhaContaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'cadastro',
        component: CadastroComponent
      },
    ]),
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
    ]),
    RouterModule.forRoot([
      {
        path: 'minha_conta',
        component: MinhaContaComponent
      },
    ])
  ],
  providers: [CadastroService, LoginService, MinhaContaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
