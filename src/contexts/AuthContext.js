import PropTypes from 'prop-types';
import { createContext } from 'react';

async function login(email, password) {
    const data = {
        email: email,
        password: password
    }
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
    })
    return await response.json();
}

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const EmailPasswordSignIn = (email, password) => login(email, password);

    return (
        <AuthContext.Provider
            value={{
                EmailPasswordSignIn,
                test: true
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthContext;