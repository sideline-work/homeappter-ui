import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'listings',
        loadChildren: () => import('@modules/listings/listings.module').then((m) => m.ListingsModule),
      },
      {
        path: 'showings',
        loadChildren: () => import('@modules/showings/showings.module').then((m) => m.ShowingsModule),
      },
      {
        path: 'member',
        loadChildren: () => import('@modules/member/member.module').then((m) => m.MemberModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('@modules/messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: 'feedback',
        loadChildren: () => import('@modules/feedback/feedback.module').then((m) => m.FeedbackModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('@modules/reports/reports.module').then((m) => m.ReportsModule),
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
