import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ReturnApprovalPage = () => {
    const { user, id , checkdate} = useParams();
    const userid = user;
    const resourceid = id;
    const checkoutdate = checkdate.slice(0,10);

    // Handles the approval for the return
    const handleApproveReturn = async() => {
        try {
            const response = await axios.post('http://localhost:3001/employee/returns/approval', { userid, resourceid, checkoutdate });
            if (response.status === 200) {
                setSuccess('Checkout approved successfully!')
                setError(null)
            }
            else {
                setError('Issue in approving return')
                setSuccess(null)
            }
        } catch(error) {
            console.log('ERROR in approving return', error);
        }
    }

    return (
    <div>
      <h1>Approving Return for {userid}</h1>
      <p>Approving: {resourceid}</p>
      <p>Checkout Date: {checkoutdate}</p>
      
      <form onSubmit={handleApproveReturn}>
        <button
        type="submit"
        className='inputsubmit'
        >Approve Return</button>
      </form>
    </div>
    )
}

export default ReturnApprovalPage;