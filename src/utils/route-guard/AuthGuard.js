import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    async function authMiddleware() {
      if (!isLoggedIn) {
        navigate('login', { replace: true });
      } else {
        let token = localStorage.getItem('settings');
        let decodedToken = jwt_decode(token);
        //console.log("Decoded Token", decodedToken);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          console.log('Token expired.');
          localStorage.clear();
          try {
            await logout().then(
              navigate('login', { replace: true })
            );
          } catch (err) {
            console.error(err);
          }
        } else {
          //console.log("Valid token");
        }

      }
    }

    authMiddleware();
  }, [isLoggedIn, navigate]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
