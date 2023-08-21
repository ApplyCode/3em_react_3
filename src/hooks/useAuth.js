// auth provider
// import AuthContext from 'contexts/FirebaseContext';
// import AuthContext from 'contexts/AWSCognitoContext';
// import AuthContext from 'contexts/JWTContext';
// import AuthContext from 'contexts/AuthContext';

async function login(email, password) {
  const data = new FormData()
  data.append("email", email);
  data.append("password", password);
  const response = await fetch(`http://app.3em.bet/admin/api/login`, {
    method: 'POST',
    body: data
  })

  return await response.json();
}

function logout() {
  localStorage.clear()
  return true
}

// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
  const EmailPasswordSignIn = (email, password) => login(email, password);

  return {
    EmailPasswordSignIn: EmailPasswordSignIn,
    logout: logout
  }
};

export default useAuth;
