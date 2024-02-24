import './add.css';

import Form from '../../components/add/form/form.component';

const AddPage = (props) => {
  return (
    <div className="add-page">
      <h1>Add Menu Item</h1>
      <Form onNavigate={props.onNavigate} />
    </div>
  );
};

export default AddPage;