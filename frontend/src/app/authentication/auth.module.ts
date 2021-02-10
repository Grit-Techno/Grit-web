import { NgModule } from '@angular/core';

// components
import { AuthComponent } from './login/auth.component';
import { LogoutComponent } from './logout/logout.component';

// Service
// import { NoAuthGuard } from './no-auth-guard.service';
import { SessionService } from './session.service';
import { SharedModule, AuthGuard } from '../shared';
import { AuthenticationRoutingModule } from './authentication-routing.module';

// Directives
import { ShowAuthedDirective } from './show-authed.directive';
import { MaterialListModule } from '../material.module';
import { UserIdleModule } from 'angular-user-idle';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AgmCoreModule } from '@agm/core';
import { PhoneMaskDirective } from '../shared/phone-mask.directive';
import { RecoveryComponent } from './recovery/recovery.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RegisterInvesterComponent } from './register-invester/register-invester.component';
import { RegisterLearnerComponent } from './register-learner/register-learner.component';
import { InvestorHomeComponent } from './investor-home/investor-home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LearnerHomeComponent } from './learner-home/learner-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DonateNowComponent } from './donate-now/donate-now.component';
import { TokenService } from '../shared/services/token.service';
import { BeforeLoginService } from '../shared/services/before-login.service';
import { AfterLoginService } from '../shared/services/after-login.service';
import { AuthService } from '../shared/services/auth.service';
import { LearnerCompleteProfileComponent } from './learner-complete-profile/learner-complete-profile.component';
import { AboutComponent } from './about/about.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './payment/payment.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// Import your library
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAJnDvfb4o372s6og8i70DPNAcD9FpnAT8',
      libraries: ['places']
    }),
    AuthenticationRoutingModule,
    SharedModule,
    MaterialListModule,
    NgxStripeModule.forRoot('pk_test_QNnViH4iWOnjTHMAS9kjeIGO'),
    UserIdleModule.forRoot({ idle: 600, timeout: 2, ping: 2 }),
    NgMultiSelectDropDownModule,
    OwlModule
  ],
  declarations: [
    AuthComponent,
    LogoutComponent,
    ShowAuthedDirective,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    PhoneMaskDirective,
    RecoveryComponent,
    NewPasswordComponent,
    RegisterInvesterComponent,
    RegisterLearnerComponent,
    ContactusComponent,
    InvestorHomeComponent,
    LearnerHomeComponent,
    EditProfileComponent,
    DonateNowComponent,
    LearnerCompleteProfileComponent,
    AboutComponent,
    PaymentComponent
  ],
  providers: [
    // NoAuthGuard,
    AuthGuard,
    SessionService,
    TokenService,
    AuthService,
     AfterLoginService,
     BeforeLoginService,
  ],
  exports: [ShowAuthedDirective]
})
export class AuthModule { }
