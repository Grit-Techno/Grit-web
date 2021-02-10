import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './login/auth.component';
import { LogoutComponent } from './logout/logout.component';
// import {  } from './no-auth-guard.service';
import { NgModule } from '@angular/core';
import { BeforeLoginService } from '../shared/services/before-login.service';
import { AfterLoginService } from '../shared/services/after-login.service';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RegisterInvesterComponent } from './register-invester/register-invester.component';
import { RegisterLearnerComponent } from './register-learner/register-learner.component';
import { ContactusComponent } from './contactus/contactus.component';
import { InvestorHomeComponent } from './investor-home/investor-home.component';
import { LearnerHomeComponent } from './learner-home/learner-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DonateNowComponent } from './donate-now/donate-now.component';
import { LearnerCompleteProfileComponent } from './learner-complete-profile/learner-complete-profile.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';

const appRoutes: Routes = [

    {
        path: '',
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'login',
                component: AuthComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'learner',
                component: RegisterLearnerComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'invester',
                component: RegisterInvesterComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AfterLoginService]
            },
            {
                path: 'forgot',
                component: RecoveryComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'reset',
                component: NewPasswordComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'investor-home',
                component: InvestorHomeComponent,
                canActivate: [AfterLoginService]
            },
            {
                path: 'learner-home',
                component: LearnerHomeComponent,
                canActivate: [AfterLoginService]
            },
            {
                path: 'learner-complete-profile',
                component: LearnerCompleteProfileComponent,
                canActivate: [AfterLoginService]
            },
            {
                path: 'edit-profile',
                component: EditProfileComponent,
                canActivate: [AfterLoginService]
            },
            {
                path: 'payment',
                component: PaymentComponent,
                canActivate: []
            },
            {
                path: 'donate-now',
                component: DonateNowComponent,
                canActivate: []
            },
            {
                path: 'contactus',
                component: ContactusComponent,
                canActivate: [BeforeLoginService]
            },
            {
                path: 'about',
                component: AboutComponent,
                canActivate: [BeforeLoginService]
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthenticationRoutingModule { }
