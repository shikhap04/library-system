import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/createAccount.css';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountLevel, setAccountLevel] = useState(1);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // FOR FUTURE TO MAKE OPTION SO THAT ADMIN CAN CREATE EMPLOYEE, USER AND ETC.
    const loggedIn = sessionStorage.getItem('loggedIn');
    const currAccountLevel = sessionStorage.getItem('accountLevel');
    var isAdmin = false;
    var isEmployee = false;
    if (loggedIn && currAccountLevel == 3) {
        isAdmin = true;
        isEmployee = true;
    } else if (loggedIn && currAccountLevel == 2) {
        isEmployee = true;
    }
    var selectLevel = "Please log in once an account has been created!";
    if (isAdmin) {
        selectLevel = <select 
                value={accountLevel}
                onInput={(e) => setAccountLevel(Number(e.target.value))}>
                <option value = "1">User</option>
                <option value = "2">Employee</option>
                <option value = "3">Administrator</option>
            </select>;
    } else if (isEmployee) {
        selectLevel = <select 
                value={accountLevel}
                onInput={(e) => setAccountLevel(Number(e.target.value))}>
                <option value = "1">User</option>
                <option value = "2">Employee</option>
            </select>;
    } 

  const handleCreateAccount = async(e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:3001/login/createAccount', { username, password, accountLevel});
        if (response.status === 200) {
            if (accountLevel == 1) navigate('/account');
            else navigate('/account');
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
            {isEmployee && (selectLevel)}
            <button type="submit">Create Account</button>
        </form>
        {error && <p style={{ color: 'red'}}>Error: {error}</p>}
    </div>
  );
}

export default CreateAccount;