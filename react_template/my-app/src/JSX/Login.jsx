import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import "../CSS/login.css";

const Login = ({ setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); //trackar vilken form (login el register)
  const auth = getAuth();
  const navigate = useNavigate();

  //login user / admin
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem("isLoggedIn", 'true');
      localStorage.setItem("userId", user.uid);

      setIsLoggedIn(true);
      setUser(user);
      alert("Välkommen " + user.email);

      //fetch user data from Firestore
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userStatus = userDoc.data().status;

        //set admin state
        if (userStatus === 'admin') {
            localStorage.setItem("isAdmin", 'true');
        }

        if (userStatus === 'admin') {
          navigate('/adminpage');
        } else {
          navigate('/');
        }
      } else {
        console.error("No user data found in Firestore");
      }
    } catch (error) {
      setError(error.message);
      console.error('Login Error:', error.message);
    }
  };

  //registering
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //skapar user i firestore också med mer info
      const firestore = getFirestore();
      await setDoc(doc(firestore, "Users", user.uid), {
        firstName,
        lastName,
        email,
        status: 'user'
      });

      setIsLoggedIn(true);
      setUser(user);
      alert("Välkommen " + user.email);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Register Error:', error.message);
    }
  };

  //byter mellan login och registeringsformen
  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginClick = () => {
    setIsRegistering(false);
  };

  return (
    <div className="background">
      {isLoggedIn ? (
        <div className="logout-button-container">
        </div>
      ) : (
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <h3>{isRegistering ? 'Register Here' : 'Login Here'}</h3>
          {error && <div className="error-message">{error}</div>}
          <label htmlFor="email">Email</label>
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
          {isRegistering && (
            <>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <button type="submit">{isRegistering ? 'Register' : 'Log In'}</button>
          {/* Toggle between login and register - ( : ) som används i hela returnen är som ett "if else" */}
          {!isRegistering ? (
            <div>
              <button type="button" onClick={handleRegisterClick}>Don't have an account? Register</button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={handleLoginClick}>Already have an account? Log In</button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default Login;
