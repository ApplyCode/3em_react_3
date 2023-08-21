import PropTypes from 'prop-types';

// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

import logo from 'assets/images/logo.png';

// ==============================|| LOGO SVG ||============================== //

const LogoMain = () => {
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img src={logo} alt={'3EM Danieli'}/>
    </>
  );
};

LogoMain.propTypes = {
  reverse: PropTypes.bool
};

export default LogoMain;
