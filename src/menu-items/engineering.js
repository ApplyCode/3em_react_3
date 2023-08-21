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

const engineering = {
  id: 'group-engineering',
  type: 'group',
  children: [
    {
      id: 'engineering',
      title: 'Engineering',
      type: 'collapse',
      icon: icons.DashboardOutlined,
      children: [
        {
          id: 'engineering-site',
          title: <FormattedMessage id="site" />,
          type: 'item',
          url: '/engineering/site',
          breadcrumbs: false
        }
      ]
    },
  ]
};

export default engineering;
