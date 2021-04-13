import React, {useEffect,useState} from 'react';
import { usePaystackPayment } from 'react-paystack';
import Loader from "react-loader-spinner";
import Popup from "reactjs-popup";
import {authentication} from '../../firebase/firebase';

const MakePayment = (props) =>{
    // states for the payment interface
    const [email,setEmail] = useState(props.email);
    const [paymentLoader,setPaymentLoader] = useState(false);

    // configuration settings for the payment portal
    const config = {
        reference: (new Date()).getTime(),
        email: email,
        amount: props.paystackamount*100,
        publicKey: 'pk_test_678a61b3b10c85cf881854823605d8c7a7aa7528',
        currency:'ZAR'
    };

    // initialise paystack
    const initializePayment = usePaystackPayment(config);

    
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        if(reference.status == "success"){
            setPaymentLoader(true);
            authentication.onAuthStateChanged(user=>{
                fetch('https://mutualism-test.herokuapp.com/api/makePayment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body:"payment_amount="+props.paystackamount+"&userId="+user.uid
                })
                .then(re=>re.json())
                .then(re=>{
                    console.log(re);
                    setPaymentLoader(false);
                    props.paymentSuccess();
                })
            })
        }
    };

    
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    let heading = "Monthly payment outstanding.";
    return(
        <>
        <div>
            <div className="row dashboard-components alert-container">
                <div className="col-sm-12 status-head">
                    <div className="status-heading">{heading}</div>
                    <div className="status-body">
                        <div>
                            <p>You have an outstanding installment that was due on {props.repaymentDate} of {props.repaymentAmount}.
                            Please submit a payment as soon as possible.</p>
                            <button onClick={()=>initializePayment(onSuccess, onClose)} className="status-button-prompt alert-button">Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Popup modal position="right center" open={paymentLoader} closeOnDocumentClick={false}>
            <Loader type="Grid" color="#212529" height={100} width={100}/>
        </Popup>
        </>
    )
}

export default MakePayment;