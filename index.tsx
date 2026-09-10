
import ptBr from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import 'dayjs/locale/pt-br';
import { provideNgxMask } from 'ngx-mask';

import { AppComponent } from './src/app.component';
import { ChatListComponent } from './src/components/chat/chat-list.component';
import { ChatComponent } from './src/components/chat/chat.component';
import { CheckoutComponent } from './src/components/checkout/checkout.component';
import { CheckoutChatComponent } from './src/components/checkout/checkout-chat.component';
import { FiltersComponent } from './src/components/filters/filters.component';
import { HomeComponent } from './src/components/home/home.component';
import { HomeMapComponent } from './src/components/home-map/home-map.component';
import { InstructorDetailComponent } from './src/components/instructor-detail/instructor-detail.component';
import { InstructorPerfilComponent } from './src/components/instructor-perfil/instructor-perfil.component';
import { InstructorPerfilSeloComponent } from './src/components/instructor-perfil/instructor-perfil-selo.component';
import { InstructorPricesComponent } from './src/components/instructor-prices/instructor-prices.component';
import { InstructorReviewsComponent } from './src/components/instructor-reviews/instructor-reviews.component';
import { InstructorViewComponent } from './src/components/instructor-view/instructor-view.component';
import { LoginComponent } from './src/components/login/login.component';
import { MyClassesInstrutorComponent } from './src/components/my-classes/my-classes-instrutor.component';
import { MyClassesComponent } from './src/components/my-classes/my-classes.component';
import { PaymentSuccessComponent } from './src/components/payment-success/payment-success.component';
import { BoasVindasComponent } from './src/components/primeiros-passos/boas-vindas.component';
import { PrimeirosPassosComponent } from './src/components/primeiros-passos/primeiros-passos.component';
import { RegisterComponent } from './src/components/register/register.component';
import { RegisterInstructorComponent } from './src/components/register-instructor/register-instructor.component';
import { authGuardAluno, authGuardAlunoInstrutor, authGuardInstrutor, rootGuard } from './src/services/auth.guard';
import { EncontrarAlunosComponent } from './src/components/encontrar-alunos/encontrar-alunos.component';
import { FinanceiroComponent } from './src/components/financeiro/financeiro.component';
import { PromocaoCuritibaComponent } from './src/components/promocao-curitiba/promocao-curitiba.component';
import { IframeScreenComponent } from './src/components/iframe-screen/iframe-screen.component';
import { AlunoOnboardingComponent } from './src/components/aluno-onboarding/aluno-onboarding.component';

import { registerLocaleData } from '@angular/common';
import dayjs from 'dayjs';

dayjs.locale('pt-br');
registerLocaleData(ptBr, 'pt-BR');

const routes: Routes = [
  // Rota raiz agora usa o rootGuard para decidir o destino
  { path: '', canActivate: [rootGuard], component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-instructor', component: RegisterInstructorComponent },
  { path: 'promocao-curitiba', component: PromocaoCuritibaComponent },
  { path: 'iframe-container', component: IframeScreenComponent },
  {
    path: '',
    canActivate: [authGuardAluno],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'home-map', component: HomeMapComponent },
      { path: 'instructor/:id', component: InstructorDetailComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'checkout-chat', component: CheckoutChatComponent },
      { path: 'payment-success', component: PaymentSuccessComponent },
      // { path: 'toast-demo', component: ToastDemoComponent },
      // { path: 'modal-demo', component: ModalDemoComponent },
      { path: 'filters', component: FiltersComponent },
      { path: 'primeiros-passos', component: PrimeirosPassosComponent },
      { path: 'my-classes', component: MyClassesComponent },
      { path: 'aluno-onboarding', component: AlunoOnboardingComponent },
    ]
  },
  {
    path: '',
    canActivate: [authGuardInstrutor],
    children: [
      { path: 'boas-vindas', component: BoasVindasComponent },
      { path: 'encontrar-alunos', component: EncontrarAlunosComponent },
      { path: 'instructor-view', component: InstructorViewComponent },
      { path: 'instructor-prices/:id', component: InstructorPricesComponent },
      { path: 'instructor-reviews', component: InstructorReviewsComponent },
      { path: 'instructor-perfil', component: InstructorPerfilComponent },
      { path: 'instructor-perfil-selo', component: InstructorPerfilSeloComponent },
      { path: 'financeiro', component: FinanceiroComponent },
    ]
  },
  {
    path: '',
    canActivate: [authGuardAlunoInstrutor],
    children: [
      { path: 'my-classes-instrutor', component: MyClassesInstrutorComponent },
      { path: 'chats', component: ChatListComponent },
      { path: 'chat/:id', component: ChatComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ]
}).catch((err) => console.error(err));