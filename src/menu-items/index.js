// project import
import applications from './applications';
import dashboard from './dashboard';
import widget from './widget';
import formsTables from './forms-tables';
import chartsMap from './charts-map';
import other from './other';
import pages from './pages';
import anagrafica from './anagrafica';
import ordini from './ordini';
import centro_costi from './centro-costi';
import engineering from './engineering';
import timesheet from './timesheet'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items_old: [dashboard, widget, applications, formsTables, chartsMap, pages, other],
  items: [anagrafica, ordini, centro_costi, engineering, timesheet, formsTables]
};

export default menuItems;
