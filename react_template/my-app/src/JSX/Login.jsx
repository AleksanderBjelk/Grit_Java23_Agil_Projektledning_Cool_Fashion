import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import "../CSS/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [error, setError] = useState('');
  const auth = getAuth();
//const history = useHistory();  //redirect
 const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Logged in as:', user.email);
      setIsLoggedIn(true);
      setUser(user)
    
      navigate('/');
      alert("Välkommen " + user.email);

    } catch (error) {
      setError(error.message);
      setIsLoggedIn(false);
      console.error('Login Error:', error.message);

    }
  };

  return (
    <div className="background">
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>
        {error && <div className="error-message">{error}</div>}
        {isLoggedIn && <div className="login-notice">Välkommen {user.email}</div>}


        <label htmlFor="username">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
