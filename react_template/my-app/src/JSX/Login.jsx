import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, getDoc} from 'firebase/firestore';
import "../CSS/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); //trackar vilken form (login el register)
  const auth = getAuth();
  const navigate = useNavigate();

  //login
  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log(user.email + "is logged in");
      setIsLoggedIn(true);
      setUser(user);
      alert("Välkommen " + user.email);
      console.log(user.status)

      const firestore = getFirestore();
      const userDocRef = doc(firestore, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);

      //
      if (userDoc.exists()) {
        const userStatus = userDoc.data().status;//hämtar status från fs
        checkStatus(userStatus); //här kollar om user är admin eller user
        console.log(userStatus)

    } else {
        console.error("No user data found in Firestore");
      }


    } catch (error) {
      setError(error.message);
      setIsLoggedIn(false);
      console.error('Login Error', error.message);
    }
  }

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
        status: 'user' //default status är user
      });

      console.log('User registered:', user.email);
      setIsLoggedIn(true);
      setUser(user);
      navigate('/');
      alert("Välkommen " + user.email);

    } catch (error) {
      setError(error.message);
      setIsLoggedIn(false);
      console.error('Register Error:', error.message);
    }
  };

  const checkStatus = (status) => {
    if (status === 'admin') {
      navigate('/adminpage');
    } else {
      navigate('/');
    }
  };

 //byta mellan login och registerings forms
 const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleLoginClick = () => {
    setIsRegistering(false);
  };

  return (
    <div className="background">
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <h3>{isRegistering ? 'Register Here' : 'Login Here'}</h3>

        {error && <div className="error-message">{error}</div>}
        {isLoggedIn && <div className="login-notice">Välkommen {user.email}</div>}

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

        {/*toggle button */}
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
    </div>
  );
};

export default Login;