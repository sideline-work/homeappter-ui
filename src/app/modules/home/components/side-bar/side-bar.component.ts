import { Component, OnInit } from '@angular/core';
import { HasRolePipe } from '@shared/pipes';
import { MenuItem } from 'primeng/api';
import { ROLES } from '@core/constants/auth';
import { DialogService } from '@core/services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  readonly ROLES = ROLES;

  items: MenuItem[] = [];
  display = true;

  constructor(
    private dialogService: DialogService,
    private hasRole: HasRolePipe) { }

  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-pw pi-home',
            routerLink: ['/home'],
            visible: true
        },
        {
            label: 'Messages',
            // label: '<div class="p-d-flex p-ai-center"><p class="panel-menu-label">Messages</p><p class="p-mr-2 panel-menu-chip p-chip p-component">coming soon</p></div>',
            // escape: false,
            icon: 'pi pi-fw pi-envelope',
            routerLink: ['/home/messages'],
            visible: this.hasRole.transform(ROLES.MEMBER),
            // command: (event) => {
            //   this.notAvailableModule(event);
            // }
        },
        {
          label: 'Showings',
          icon: 'pi pi-fw pi-calendar',
          visible: this.hasRole.transform(ROLES.MEMBER),
          items: [
            {
              label: 'Calendar',
              icon: 'pi pi-fw pi-caret-right',
              routerLink: ['/home/showings']
            },
          ]
        },
        {
          label: 'Listings',
          icon: 'pi pi-fw pi-list',
          visible: this.hasRole.transform(ROLES.MEMBER),
          items: [
            {
              label: 'My Listings',
              icon: 'pi pi-fw pi-caret-right',
              routerLink: ['/home/listings']
            },
            {
              label: 'Enter a New Listing',
              icon: 'pi pi-fw pi-caret-right',
              routerLink: ['/home/listings/new-listing']
            },
          ]
        },
        {
          label: 'Contacts',
          // label: '<div class="p-d-flex p-ai-center"><p class="panel-menu-label">Contacts</p><p class="p-mr-2 panel-menu-chip p-chip p-component">coming soon</p></div>',
          // escape: false,
          icon: 'pi pi-fw pi-users',
          visible: this.hasRole.transform(ROLES.MEMBER),
          command: (event) => {
            this.notAvailableModule(event);
          }
        },
        {
          label: 'Feedback',
          // label: '<div class="p-d-flex p-ai-center"><p class="panel-menu-label">Feedback</p><p class="p-mr-2 panel-menu-chip p-chip p-component">coming soon</p></div>',
          // escape: false,
          icon: 'pi pi-fw fa fa-comments-o',
          visible: this.hasRole.transform(ROLES.MEMBER),
          // command: (event) => {
          //   this.notAvailableModule(event);
          // }
          //routerLink: ['/home/feedback']
          items: [
            {
              label: 'My Feedback',
              icon: 'pi pi-fw pi-caret-right',
              routerLink: ['/home/feedback']
            },
            {
              label: 'Form Design and Setting',
              icon: 'pi pi-fw pi-caret-right'
				//,
              //routerLink: ['/home/feedback/feedback-settings']
            },
          ]
        },
        {
          label: 'Reports',
          // label: '<div class="p-d-flex p-ai-center"><p class="panel-menu-label">Reports</p><p class="p-mr-2 panel-menu-chip p-chip p-component">coming soon</p></div>',
          // escape: false,
          icon: 'pi pi-fw fa fa-line-chart',
          visible: this.hasRole.transform(ROLES.MEMBER),
          // command: (event) => {
          //   this.notAvailableModule(event);
          // }
          routerLink: ['/home/reports']
        },
        {
          label: 'Help and Support',
          // label: '<div class="p-d-flex p-ai-center"><p class="panel-menu-label">Help and Support</p><p class="p-mr-2 panel-menu-chip p-chip p-component">coming soon</p></div>',
          // escape: false,
          icon: 'pi pi-fw pi-question-circle',
          visible: this.hasRole.transform(ROLES.MEMBER),
          command: (event) => {
            this.notAvailableModule(event);
          }
        },
    ];

  }

  private notAvailableModule (event: any) {
    this.dialogService.openInfoDialog({
      header: ' ',
      message: event.item.label + ' is coming soon',
      disableIcon: true,
      onAccept: () => {
      },
    });
  }
}
