import { Component, TemplateRef, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.scss']
})
export class MyTicketComponent implements OnInit {
  ticketIdSelect = '';
  indexSelect = 'add';
  type_modal = 'add';
  username = 'Adit';
  modalStreamInput = '';
  modalTicketInput = '';
  modalDescriptionInput = '';
  modalRef: BsModalRef;
  public filter: string = 'ticketName';
  public filterValue: string = '';
  totalItems: number = 16;
  currentPage: number   = 1;
  productArr = ['Axis', 'Prepaid', 'Postpaid', 'Vas'];
  activityArr = ['Initial Ticket', 'Approved By BRM', 'Waiting Approval', 'Withdrew by BRM', 'Approved By Tester'];
  statusArr = ['open', 'reject', 'on-going'];
  nameArr = ['Adit'];
  ticketArr = ['Bronet Axis', 'Sisnet Axis', 'Internet Axis', 'Gammer Package', 'Paket Mantep'];
  columnData = [
    'Ticket ID',
    'Ticket Name',
    'Reporter',
    'Create Date',
    'Status',
    'Activity',
    'Product Stream',
    'Action'
  ];
  listData = [];
  listDataFilter = [];
  listDataFilter2 = [];
  constructor(private modalService: BsModalService) { }


  ngOnInit(): void {
    const temp = [];
    for (let i = 1; i <= this.totalItems; i++) {
      temp.push({
        ticketId: 'AX00' + i,
        ticketName: this.getRand(this.ticketArr),
        reporter: this.getRand(this.nameArr),
        createDate: moment().subtract(Math.floor(Math.random() * 5), 'day').format('YYYY-MM-DD'),
        status: this.getRand(this.statusArr),
        activity: this.getRand(this.activityArr),
        productStream: this.getRand(this.productArr),
        action: 'proses',
        desc: ' '
      });
    }
    this.listData = temp;
    this.listDataFilter = temp;
    this.listDataFilter2 = this.paginate(this.listDataFilter, 10);
  }

  getRand(data = []) {
    const index = Math.floor(Math.random() * data.length);
    return data[index];
  }

  openModal(template: TemplateRef<any>, type: string, ticketId = '') {
    this.type_modal = type;
    console.log(ticketId);
    if (type === 'edit') {
      this.ticketIdSelect = ticketId;
      this.indexSelect = this.listDataFilter2[this.currentPage - 1].findIndex(item => item.ticketId === ticketId);
      this.modalTicketInput = this.listDataFilter2[this.currentPage - 1][this.indexSelect].ticketName;
      this.modalStreamInput = this.listDataFilter2[this.currentPage - 1][this.indexSelect].productStream;
      this.modalDescriptionInput = this.listDataFilter2[this.currentPage - 1][this.indexSelect].desc;
    }
    this.modalRef = this.modalService.show(template);
  }

  paginate(arr, size) {
    return arr.reduce((acc, val, i) => {
      const idx = Math.floor(i / size);
      const page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  }

  onSearch() {
    console.log(this.filter, this.filterValue);
    this.listDataFilter = this.listData.filter(item => item[this.filter].toLowerCase().indexOf(this.filterValue.toLowerCase()) !== -1);
    this.totalItems = this.listDataFilter.length;
    console.log('this.listDataFilter', this.listDataFilter);
  }

  onChangeSelect(e) {
    this.filter = e.target.value;
    console.log('filter', this.filter);
  }
  onChangeSelectStream(e) {
    this.modalStreamInput = e.target.value;
    console.log('modalStreamInput', this.filter);
  }
  onChangeInputTicket(e) {
    this.modalTicketInput = e.target.value;
  }
  onChangeInputDescription(e) {
    this.modalDescriptionInput = e.target.value;
  }

  onSave(isAdd = true) {
    console.log(this.modalTicketInput);
    console.log(this.modalStreamInput);
    console.log(this.modalDescriptionInput);
    this.modalService.hide();
    let data = [];
    if (isAdd) {
      data.push({
        ticketId: 'AX00' + Math.floor(Math.random() * 1000),
        ticketName: this.modalTicketInput,
        reporter: this.username,
        createDate: moment().format('YYYY-MM-DD'),
        status: 'open',
        activity: 'Initial Ticket',
        productStream: this.modalStreamInput,
        desc: this.modalDescriptionInput,
        action: 'proses',
      });
      this.listData.forEach(item => {
        data.push(item);
      });
    } else {
      data = this.listData;
      const index = data.findIndex(item => item.ticketId === this.ticketIdSelect);
      data[index].ticketName = this.modalTicketInput;
      data[index].productStream = this.modalStreamInput;
      data[index].desc = this.modalDescriptionInput;
    }

    this.listData = data;
    this.listDataFilter = data;
    this.listDataFilter2 = this.paginate(this.listDataFilter, 10);
    this.totalItems = this.listDataFilter.length;
    this.modalTicketInput = '';
    this.modalStreamInput = '';
    this.modalDescriptionInput = '';
  }

  onChangeInput(e) {
    this.filterValue = e.target.value;
  }

  onClear() {
    this.filter = 'ticketName';
    this.filterValue = '';
    this.listDataFilter = this.listData;
    this.totalItems = this.listDataFilter.length;
  }
  pageChanged(event: any): void {
    this.currentPage = event.page;
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

}
