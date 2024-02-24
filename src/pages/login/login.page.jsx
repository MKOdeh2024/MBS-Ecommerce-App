import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/providers/user-provider.component';
import Input from '../../components/common/input/input.component';
import { loginUser } from '../../services/users.service';
import './login.css';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    // To check if the user is already logged in, send him to the view page
    if (userContext.user?.id) {
      navigate('/', { replace: true });
    }
  }, []);

  /**
 * Handler function for the form onSubmit event.
 * @param {React.FormEvent<HTMLFormElement>} e Event object.
 */
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (email && password) {
      let user = await loginUser(email, password);
      console.log("user is ",user);

      // If Successful login, go to view page
      if (user) {
        userContext.setUser(user);
        navigate('/', { replace: true });
      } else {
        alert("Email or Password are not correct! Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="ahmad@example.com"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
        />
        <div>
          <button className="nemo-button" type="submit">Login</button>
        </div>
      </form >
    </div >
  );
};

export default LoginPage;;