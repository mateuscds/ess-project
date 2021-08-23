import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { DuvidaComponent } from './duvida/duvida.component';
import { ExibirDuvidaComponent } from './exibirDuvida/exibirduvida.component';
import { ExibirDuvidaService } from './exibirDuvida/exibirduvida.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CadastroComponent,
    LoginComponent,
    MinhaContaComponent,
    DuvidaComponent,
    ExibirDuvidaComponent
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
    ]),
    RouterModule.forRoot([
      {
        path: 'duvida',
        component: DuvidaComponent
      },
    ]),
    RouterModule.forRoot([
      {
        path: 'exibir_duvida',
        component: ExibirDuvidaComponent
      },
    ])
  ],
  providers: [CadastroService, LoginService, MinhaContaService, ExibirDuvidaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
