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

const centro_costi = {
  id: 'group-centro-costi',
  type: 'group',
  children: [
    {
      id: 'centro-costi',
      title: <FormattedMessage id="centro-costi" />,
      type: 'collapse',
      icon: icons.DashboardOutlined,
      children: [
        {
          id: 'descrizioni-attivita',
          title: <FormattedMessage id="descrizioni-attivita" />,
          type: 'item',
          url: '/centro-costi/descrizioni-attivita',
          breadcrumbs: false
        }
      ]
    },
  ]
};

export default centro_costi;
