import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Ticket'
  },
  {
    name: 'All Ticket',
    url: '/ticket/all-ticket',
    icon: 'icon-puzzle'
  },
  {
    name: 'My Ticket',
    url: '/ticket/my-ticket',
    icon: 'icon-puzzle'
  },
];
