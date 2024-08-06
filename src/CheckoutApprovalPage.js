import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CheckoutApprovalPage = () => {
    const { user, id, checkdate} = useParams();
    const userid = user;
    const resourceid = id;
    const checkoutdate = checkdate.slice(0, 10)

    // Handles the approval for the checkout
    const handleApproveCheckout = async() => {
        try {
            const response = await axios.post('http://localhost:3001/employee/checkouts/approval', { userid, resourceid, checkoutdate });
            if (response.status === 200) {
                setSuccess('Checkout approved successfully!')
                setError(null)
            }
            else {
                setError('Issue in approving checkout')
                setSuccess(null)
            }
        } catch(error) {
            console.log('ERROR in approving checkout', error);
        }
    };

    return (
    <div>
      <h1>Approving Checkout for {userid}</h1>
      <p>Approving: {resourceid}</p>
      <p>Checkout Date: {checkoutdate}</p>
      <form onSubmit={handleApproveCheckout}>
        <button type="submit" className='inputsubmit'>Approve Check Out</button>
      </form>
    </div>
    )
}

export default CheckoutApprovalPage;