import './not-found.css';
import { ReactComponent as Burger } from '../../assets/illustrations/burger.svg';

const NotFound = (props) => {
  return (
    <div className="not-found-page">
      <div className="main">
        <Burger />
      </div>
    </div>
  );
};

export default NotFound;