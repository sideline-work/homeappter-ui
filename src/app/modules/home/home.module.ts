import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@NgModule({
  declarations: [HomeComponent, SideBarComponent, HeaderComponent, FooterComponent, ProfileCardComponent],
  imports: [
    SharedModule, HomeRoutingModule
  ]
})
export class HomeModule { }
