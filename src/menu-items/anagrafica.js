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

const anagrafica = {
  id: 'group-anagrafica',
  type: 'group',
  children: [
    {
      id: 'anagrafica',
      title: <FormattedMessage id="anagrafica" />,
      type: 'collapse',
      icon: icons.DashboardOutlined,
      children: [
        {
          id: 'committenti',
          title: <FormattedMessage id="committenti" />,
          type: 'collapse',
          children: [
            {
              id: 'committenti-list',
              title: <FormattedMessage id="committenti-list" />,
              type: 'item',
              url: '/anagrafica/committenti',
              breadcrumbs: true // default is true
            },
            {
              id: 'committenti-create',
              title: <FormattedMessage id="committenti-create" />,
              type: 'item',
              //display: 'none',
              url: '/anagrafica/committenti/create',
              breadcrumbs: true // default is true
            }
          ]
        },
        {
          id: 'clienti-finali',
          title: <FormattedMessage id="clienti-finali" />,
          type: 'collapse',
          children: [
            {
              id: 'clienti-finali-list',
              title: <FormattedMessage id="clienti-finali-list" />,
              type: 'item',
              url: '/anagrafica/clienti-finali'
            },
            {
              id: 'clienti-finali-create',
              title: <FormattedMessage id="clienti-finali-create" />,
              type: 'item',
              url: '/anagrafica/clienti-finali/create'
            },
          ]
        },
        {
          id: 'dipendenti',
          title: <FormattedMessage id="dipendenti" />,
          type: 'item',
          url: '/anagrafica/dipendenti'
        },
        {
          id: 'contratti',
          title: <FormattedMessage id="contratti" />,
          type: 'item',
          url: '/anagrafica/contratti'
        }
      ]
    },
    {
      id: 'components',
      title: <FormattedMessage id="components" />,
      type: 'item',
      url: '/components-overview/buttons',
      icon: icons.GoldOutlined,
      target: true,
      chip: {
        label: 'new',
        color: 'primary',
        size: 'small',
        variant: 'combined'
      }
    }
  ]
};

export default anagrafica;
