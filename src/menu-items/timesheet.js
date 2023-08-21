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

const timesheet = {
    id: 'group-timesheet',
    type: 'group',
    children: [
        {
            id: 'timesheet',
            title: <FormattedMessage id="timesheet" />,
            type: 'collapse',
            icon: icons.DashboardOutlined,
            children: [
                {
                    id: 'timesheet-list',
                    title: <FormattedMessage id="all-timesheets" />,
                    type: 'item',
                    url: '/timesheet-list',
                    breadcrumbs: false
                },
                {
                    id: 'timesheet',
                    title: "Timesheet",
                    type: 'item',
                    url: '/timesheet',
                    breadcrumbs: false
                }
            ]
        },
    ]
};

export default timesheet;
