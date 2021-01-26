import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTicketComponent } from './all-ticket/all-ticket.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Ticket'
    },
    children: [
      {
        path: '',
        redirectTo: 'all-ticket'
      },
      {
        path: 'all-ticket',
        component: AllTicketComponent,
        data: {
          title: 'All Ticket'
        }
      },
      {
        path: 'my-ticket',
        component: MyTicketComponent,
        data: {
          title: 'My Ticket'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {}
