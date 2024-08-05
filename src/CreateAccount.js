import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/createAccount.css';
import './generalFunctions'
import { checkAlphaNumeric } from './generalFunctions';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountLevel, setAccountLevel] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const [userDelete, setUserDelete] = useState('');
    const [errorDelete, setErrorDelete] = useState(null);
    const [successDelete, setSuccessDelete] = useState(null);
    const navigate = useNavigate();

    // FOR FUTURE TO MAKE OPTION SO THAT ADMIN CAN CREATE EMPLOYEE, USER AND ETC.
    const loggedIn = sessionStorage.getItem('loggedIn');
    const currUserName = sessionStorage.getItem('username');
    if (loggedIn) {
        const currAccountLevel = sessionStorage.getItem('accountLevel');
        var isAdmin = false;
        var isEmployee = false;
        if (loggedIn && currAccountLevel == 3) {
            isAdmin = true;
            isEmployee = true;
            var selectLevel = <select 
                    value={accountLevel}
                    onInput={(e) => setAccountLevel(Number(e.target.value))}>
                    <option value = "1">User</option>
                    <option value = "2">Employee</option>
                    <option value = "3">Administrator</option>
                </select>;
        } else if (loggedIn && currAccountLevel == 2) {
            isEmployee = true;
            var selectLevel = <select 
                    value={accountLevel}
                    onInput={(e) => setAccountLevel(Number(e.target.value))}>
                    <option value = "1">User</option>
                    <option value = "2">Employee</option>
                </select>;
        }
    }

    const handleCreateAccount = async(e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Cannot have empty username or password. Please try again!')
            setSuccess(null)
            return;
        }
        if (!checkAlphaNumeric(username) || !checkAlphaNumeric(password)) {
            setError('Usernames and passwords can only contain letters and numbers. Please try again!')
            setSuccess(null)
            return ;
        }
        
        try {
            const response = await axios.post('http://localhost:3001/login/createAccount', { username, password, accountLevel});
            if (response.status === 200) {
                if (accountLevel == 1 && !loggedIn) {
                    setSuccess('Created an account successfully, please click login below to redirect to log in page')
                    setError(null)
                }
                else {
                    const levels = ['member', 'employee', 'administrator'];
                    const successMessage = 'Created an ' + levels[accountLevel - 1] + ' account successfully!';
                    setSuccess(successMessage);
                    setError(null)
                };
                setUsername('');
                setPassword('');
            } else {
                console.log('Username taken in:', username);
                console.log('Password taken in:', password);
                setError('Username and Password already exists')
                setSuccess(null)
            }
        } catch (error) {
            setError('Account already exists, try another username!');
            setSuccess(null)
            console.log('ERROR in create acc', error);
        }
    }

    const handleDeleteAccount = async(e) => {
        e.preventDefault();
        if(!userDelete) {
            setErrorDelete('Please enter a username to delete');
            setSuccessDelete(null);
            return;
        }
        if (userDelete == 'user1' || userDelete == currUserName) {
            setErrorDelete('Cannot delete ' + userDelete +  ' please try again');
            setSuccessDelete(null);
            return;
        }
        try { 
            console.log('user to delete in handle delete: ', userDelete, typeof(userDelete));
            const response = await axios.delete('http://localhost:3001/login/delete', {
                data: {userDelete}
            });
            if (response.status === 200) {
                setSuccessDelete('Account for ' + userDelete + ' deleted successfully');
                setErrorDelete(null);
                setUserDelete('');
                return;
            }
            else {
                setErrorDelete('error in try');
                setSuccessDelete(null);
            }
        } catch (error) {
            console.log('error in handle delete', error)
            setErrorDelete("User doesn't exist try again!")
            setSuccessDelete(null);
        }
    }

    const handleRedirect = () => {
        navigate('/logIn');
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
            {loggedIn && isEmployee && (selectLevel)}
            <button type="submit">Create Account</button>
        </form>
        {error && <p style={{ color: 'red'}}>Error: {error}</p>}
        {success && 
            <div> 
                <p style={{ color: 'green'}}>Success: {success}</p>
                {!loggedIn && <button onClick={handleRedirect}>Redirect to logIn Page</button>}
            </div>
        }
        {isAdmin && 
            <div>
                <h1>Delete Account</h1>
                <form onSubmit={handleDeleteAccount}>
                    <label>Username:</label>
                    <input type='text' value = {userDelete} onChange={(e) => setUserDelete(e.target.value)}/>
                    <button type="submit">Delete Account</button>
                </form>
                {errorDelete && <p style={{ color: 'red'}}>Error: {errorDelete}</p>}
                {successDelete && <p style={{ color: 'green'}}>Success: {successDelete}</p>}
            </div>
        }
    </div>
  );
}

export default CreateAccount;