import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/providers/user-provider.component';
import Input from '../../components/common/input/input.component';
import { verifyUser } from '../../services/users.service';
import './verify.css';

const VerifyPage = (props) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    // To check if the user is already logged in, send him to the view page
    if (userContext.user?.ver == "1") {
      navigate('/', { replace: true });
    }
  }, []);

  /**
 * Handler function for the form onSubmit event.
 * @param {React.FormEvent<HTMLFormElement>} e Event object.
 */
  const handleVerify = async (e) => {
    e.preventDefault();
    const concode = e.target.concode.value.trim();
    const uid = e.target.uid.value.trim();

    if (concode) {
      let res = await verifyUser(concode,uid);

      // If Successful login, go to view page
      if (res) {
        /////////////////////
        //===================
        if(res.res == "succeeded"){
            userContext.user.ver = "1";
            navigate('/', { replace: true });
        }else{
            alert(res.text);
        }
      }else{
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleVerify}>
        <h1>Verify your account</h1>
        <input type="hidden" name="uid" value={userContext.user?.id} />
        <Input
          label="Confimation Code"
          name="concode"
          type="text"
          placeholder="XXXXXX"
          required
        />
        <div>
          <button className="nemo-button" type="submit">Verify Account</button>
        </div>
      </form >
    </div >
  );
};

export default VerifyPage;;