import React, {useState} from 'react';
import axios from 'axios';
import './css/logIn.css';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogIn = async(e) => {
    e.preventDefault();
    if (!username || !password) {
        setError('Cannot have empty username or password. Try again or make an account.')
        return;
    }
    try {
        const response = await axios.post('http://localhost:3001/login/validate', { username, password });
        if (response.status === 200) {
            const user = JSON.parse(response.data)
            console.log('Log in Successful for', user);
            
            // Store user details in session storage
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('id', user.user_id);
            sessionStorage.setItem('accountLevel', user.accountLevel);
            sessionStorage.setItem('username', user.user_name);
    
            // Verify that the session storage is set correctly
            console.log('User_id in login:', user.user_id);
            console.log('accountLevel in login:', user.accountLevel);
            console.log('Username in login:', user.user_name);
            console.log('Type of username:', typeof(user.user_name));
    
            navigate('/');
        } else {
            console.log('User taken in:', username);
            console.log('Password taken in:', password);
            setError('Incorrect username and password in log in: HERE!')
        }
    } catch (error) {
        setError('Incorrect username or password. Try again or make an account!');
        console.log('ERROR in handleLogin');
    }
  }

  return (
    <div>
        {sessionStorage.getItem('loggedIn') && navigate('/account')}
        <h1>Log In</h1>
        <form onSubmit={handleLogIn}>
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
        <div>
            <Link to="/createAccount">Create a new Account here!</Link>
        </div>
    </div>
  );
}

export default LogIn;