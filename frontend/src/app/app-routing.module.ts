import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [{
        path: '',
        loadChildren : './authentication/auth.module#AuthModule'},
];

@NgModule({
imports: [
        RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
       ],
       exports: [
        RouterModule
       ]
})

export class AppRoutingModule {}
