import axios from 'axios'
import React, {createContext, useContext, useState, useEffect} from 'react'
import { AccountContext } from './Account';
const RazorPay= createContext();


 const RazorPayContext = ({ children }) => {
  const {userData, status} = useContext(AccountContext)
 



// useEffect(() => {
//   if (status) {
 
//   }

// }, [])

///////////////////////////////////////GROUP PAGE APIS//////////////////////////////////////////////////////

 
///////////////////////////////////////ACCOUNT PAGE APIS//////////////////////////////////////////////////////

 
 


    return (
        <RazorPay.Provider value={{
          }}>
          {children}
        </RazorPay.Provider>
      );
    };
    
    
    export { RazorPayContext, RazorPay }


















//     {
//         F T, [11/11/2022 1:49 AM]
// com/accounts/accounts/1383/accounts/Grp_2_Account_1 (https://copytraderapi.fnoalgo.com/accounts/accounts/1383/accounts/Grp_2_Account_1)
// Return an updated list of all the available accounts.
// 
// 
// LICENCEING API:
// As of now licensing works over Razor Pay.
// 
// Get Licence Information:
// 
// URL : https://copytraderapi.fnoalgo.com/licence/licence/1383
// METHOD: GET
// RESULT: 
// {
//  "trialLicenceCredits": 0,
//  "trialLicenceUsedOnce": false,
//  "trialLicenceInUse": false,
//  "creditsAvailable": 0
// }
// 
// Reset Licence of an user: (available only for development purposes)
// 
// METHOD: Post
// URL: https://copytraderapi.fnoalgo.com/licence/licence/1383/reset
// 
// Trial Licence:
// 
// Software provides the user with an option for tial licence.
// Trial licence availability depends on “trialLicenceUsedOnce “ .
// 
// If trialLicenceUsedOnce is true, then enable trial licence button should be disabled.
// If its false, then user should be given with an option to enable trial licence button.
// 
// On button click API call has to be invoked to enable trial licence.
// 
// METHOD: Post
// Url: https://copytraderapi.fnoalgo.com/licence/licence/1383/trial
// 
// For Razor Pay integration:
// 
// User has to enter the number of credits to buy and the front end has to calculate the amount.
// Amount = 1.5 * number of credits.
// 
// On submit button from User:
// 
// Frontend has to create an order by calling API call..
// 
// METHOD: POST
// URL: https://copytraderapi.fnoalgo.com/payment/payment/1383/order
// Body Params:
// {
//  "amount": 50000, → This is expressed in the number of paise. Not in rupees.. For 500 Rs, it should be 50000.
//  "currency": "INR",
//  "receipt": "1bdd5397-8338-487e-b968-1e3f71368194" → UUID4 that is created for each order by frontend.
// }
// 
// Response:
// {
//  "id": "order_KVVoh9a9INVU45",
//  "entity": "order",
//  "amount": 50000,
//  "amount_paid": 0,
//  "amount_due": 50000,
//  "currency": "INR",
//  "receipt": "fc031ddd-e595-46f7-add5-54a382e9b32b",
//  "offer_id": null,
//  "status": "created",
//  "attempts": 0,
//  "notes": [],
//  "created_at": 1666156723
// }
// 
// Next step is to allow the user to perform pay using the pop up or some other means.
// 
// Sample script is
// 
// <button id="rzp-button1">Pay</button>
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
// <script>
// var options = {
//  "key": "rzp_test_4qz7S7xrRrizgo", // Enter the Key ID generated from the Dashboard
//  "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//  "currency": "INR",
//  "name": "Acme Corp",
//  "description": "Test Transaction",
//  "image": "https://example.com/your_logo",
//  "order_id": "order_KVVoh9a9INVU45", //This is a sample Order ID. Pass the id obtained in the response of Step 1
//  "handler": function (response){
//    alert(response.razorpay_payment_id);
//    alert(response.razorpay_order_id);
//    alert(response.razorpay_signature)
//  },
//  "prefill": {
//    "name": "Gaurav Kumar",
//    "email": "gaurav.kumar@example.com",
//    "contact": "9999999999"
//  },
//  "notes": {
//    "address": "Razorpay Corporate Office"
//  },
//  "theme": {
//    "color": "#3399cc"
//  }
// };
// var rzp1 = new Razorpay(options);
// rzp1.on('payment.failed', function (response){
//    alert(response.error.code);
//    alert(response.error.description);
//    alert(response.error.source);
//    alert(response.error.step);
//    alert(response.error.reason);
//    alert(response.error.metadata.order_id);
//    alert(response.error.metadata.payment_id);
// });
// document.getElementById('rzp-button1').onclick = function(e){
//  rzp1.open();
//  e.preventDefault();
// }
// </script>
// After the payment is successful,
// razorpay_payment_id, razorpay_order_id, razorpay_signature obtained from the response are to be passed to the backend for verification of the order.
// 
// METHOD: POST
// Url: https://copytraderapi.fnoalgo.com/payment/payment/1383/verify
// Params: {
// "razorpayPaymentId" : "pay_KVVqVHzeEFcbyG",
// "razorpayOrderId" : "order_KVVoh9a9INVU45",
// "razorpaySignature" : "79b912b7f66fc133a8d4cf7060dd0063278fdb6e6604bd3b4e2368966a8ca4d1"
// }
// 
// If the verification is successful then the licence information has to be updated by issuing GET licence call.

// F T, [11/11/2022 1:49 AM]
// ELse display to the user that Licence update failed.
// 
// https://razorpay.com/docs/payments/server-integration/nodejs/install (https://razorpay.com/docs/payments/server-integration/nodejs/install/)/ → related docs and information.
//     }