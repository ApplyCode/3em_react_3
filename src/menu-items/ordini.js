// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, GoldOutlined, HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  GoldOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const ordini = {
  id: 'group-ordini',
  type: 'group',
  children: [
    {
      id: 'ordini',
      title: <FormattedMessage id="ordini" />,
      type: 'collapse',
      icon: icons.DashboardOutlined,
      children: [
        {
          id: 'ordini-list',
          title: <FormattedMessage id="ordini-list" />,
          type: 'item',
          url: '/ordini',
          breadcrumbs: true
        },
        {
          id: 'ordini-create',
          title: "Crea Ordine",
          type: 'item',
          url: '/ordini-create',
          breadcrumbs: true
        }
      ]
    },
  ]
};

export default ordini;
