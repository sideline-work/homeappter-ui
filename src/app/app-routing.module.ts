import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnauthGuard } from '@core/guards';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@modules/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () => import('@modules/session/session.module').then((m) => m.SessionModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'misc',
    loadChildren: () => import('@modules/miscellaneous/miscellaneous.module').then((m) => m.MiscellaneousModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
