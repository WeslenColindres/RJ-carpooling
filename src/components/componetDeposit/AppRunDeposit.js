import * as React from 'react'
import axios from "axios";
import AppDeposit from './deposit/AppDeposit';




function AppRunDeposit() {

  const url = 'https://api-usuarios-levelup.herokuapp.com/Deposit';
  const [todos, setTodos] = React.useState([]);

  const peticionGet = () => {
    axios.get(url).then(response => {
      setTodos(response.data);
    }).catch(error => {
      console.log(error.message);
    })
  }

  React.useEffect(() => {
    peticionGet();
  }, []);
  return (
    <div>
      <AppDeposit todos={todos} />
    </div>
  );
}

export default AppRunDeposit;
