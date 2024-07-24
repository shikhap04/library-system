import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/createAccount.css';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountLevel, setaccountLevel] = useState(1);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // FOR FUTURE TO MAKE OPTION SO THAT ADMIN CAN CREATE EMPLOYEE, USER AND ETC.
    // const loggedIn = sessionStorage.getItem('loggedIn');
    // const currAccountLevel = sessionStorage.getItem('accountLevel')

  const handleCreateAccount = async(e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:3001/login/createAccount', { username, password, accountLevel});
        if (response.status === 200) {
            navigate('/');
        } else {
            console.log('Username taken in:', username);
            console.log('Password taken in:', password);
            setError('Username and Password already exists')
        }
    } catch (error) {
        setError('Account already exists, try another username!');
        console.log('ERROR in create acc', error);
    }
  }

  return (
    //<h1>please work!</h1>
    <div>
        <h1>Create a New Account</h1>
        <form onSubmit={handleCreateAccount}>
            <div>
                <label>Username:</label>
                <input type='text' value = {username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input type='text' value = {password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Log in</button>
        </form>
        {error && <p style={{ color: 'red'}}>Error: {error}</p>}
    </div>
  );
}

export default CreateAccount;