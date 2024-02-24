import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/providers/user-provider.component';
import Input from '../../components/common/input/input.component';
import { signupUser } from '../../services/users.service';
import './signup.css';

const SignupPage = (props) => {
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
  const handleSignup = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const image = e.target.image.value.trim();
    const address = e.target.address.value.trim();
    const mobile = e.target.mobile.value.trim();

    if (email && password && image && fullName && address && mobile) {
      let user = await signupUser(fullName, email, password, image, address, mobile);

      // If Successful signup, go to view page
      if (user) {
        if(user.res == 'succeeded'){
          userContext.setUser(user);
          navigate('/', { replace: true });
        }else{
          if(user.text != undefined){
            alert(user.text);
          }else{
            alert("Something went wrong");
          }
        }
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSignup}>
        <h1>Signup</h1>
        <Input
          label="Full name"
          name="fullName"
          type="text"
          placeholder="Mohammad Akram"
          required
        />
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
        <Input
          label="Your Image"
          name="image"
          type="url"
          required
        />
        <Input 
            label="Adress"
            name="adress"
            type="text"
            required
        />
        <Input
            label="Mobile Number"
            name="mobile"
            type="tel"
            required
        />
        <div>
          <button className="nemo-button" type="submit">Create Account</button>
        </div>
      </form >
    </div >
  );
};

export default SignupPage;;