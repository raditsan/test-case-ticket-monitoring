import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TicketRoutingModule } from './ticket-routing.module';
import { AllTicketComponent } from './all-ticket/all-ticket.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import {PopoverModule} from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [AllTicketComponent, MyTicketComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    PaginationModule,
    FormsModule,
    PopoverModule
  ]
})
export class TicketModule { }
