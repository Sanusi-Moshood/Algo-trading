import { AccountContext } from '../context/Account';
import {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import styles from  './dashboard.module.css'
import uuid4 from "uuid4";
import { AccountSettings } from '../context/AccountSettings';



const LicensePage = () => {
  const {userData} = useContext(AccountContext)
  const { getLicenseData, LicenseData, setLicenseData, lloading} = useContext(AccountSettings)

  // const [LicenseData, setLicenseData] = useState()
  const [RazorData, setRazorData] = useState()
  const [SuccessMsg, setSuccessMsg] = useState()
  const [trialmsg, settrialmsg] = useState(false)
  const [showBuy, setShowBuy] = useState(false)

  const [formData, setFormData] = useState({
    CreditNo:0,
    amount:0,
    receipt: uuid4()
  })
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked  : value.replaceAll(' ', '_')
    }))

    setFormData(prev => ({
      ...prev,
      amount: 1.5 * prev.CreditNo
    }))
  }

  
  useEffect(() => {
    getLicenseData()
  }, [])

  // const getLicenseData =  async () => {
  //   setLoading(true)
  // try {
  //   const res =  await axios
  //   .get(
  //     `https://copytraderapi.fnoalgo.com/licence/licence/${userData.userId}`,
  //     {
  //       headers:{
  //         AccessToken: userData.accessToken,
  //         Userid: userData.userId
  //       }
  //     }
  //   )
  //   const params = res.data;
  //   console.log(params)
  //   setLicenseData({params})
  //   console.log(LicenseData)
  //   setLoading(false)
  // } catch(err) {
  //   console.log(`An error has occured: ${err}`)
  // }
  // }


  const trialLicense =  async () => {
  try {
    const res =  await axios
    .post(
      `https://copytraderapi.fnoalgo.com/licence/licence/${userData.userId}/trial`,
      {
        headers:{
          AccessToken: userData.accessToken,
          Userid: userData.userId
        }
      }
    ).then(setLicenseData(prev => ({
      ...prev,
      trialLicenceUsedOnce: true
    })), 
    settrialmsg(true),
    setTimeout(() => {
      settrialmsg(false)
    }, 7000)
    )
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
  }
  const resetTrialLicense =  async () => {
  try {
    const res =  await axios
    .post(
      `https://copytraderapi.fnoalgo.com/licence/licence/${userData.userId}/reset`,
      {
        headers:{
          AccessToken: userData.accessToken,
          Userid: userData.userId
        }
      }
    )
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
  }

  const validatePayment =  async () => {
  try {
    const res =  await axios
    .post(
      `https://copytraderapi.fnoalgo.com/payment/payment/${userData.userId}/verify`,
      {
        razorpayPaymentId : RazorData.razorpay_payment_id,
        razorpayOrderId : RazorData.razorpay_order_id,
        razorpaySignature : RazorData.razorpay_signature
      },
      {
        headers:{
          AccessToken: userData.accessToken,
          Userid: userData.userId
        }
      }
    )
    const params = res.data;
    console.log(params)
    if (params === 'Success') {
      setSuccessMsg(true);
      getLicenseData()

      setTimeout(() => {
        setSuccessMsg(false);
      }, 15000);
    } else if (params === 'Success') {
      setSuccessMsg(true);
      getLicenseData()

      setTimeout(() => {
        setSuccessMsg(false);
      }, 15000);
    }
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
  }


    const handleBuy = (e) => {
      e.preventDefault();
      BuyLicense()
    }
    

  const BuyLicense =  async () => {
    try {
      const res =  await axios
      .post(
        `https://copytraderapi.fnoalgo.com/payment/payment/${userData.userId}/order`,
        {
          amount : 100 * formData.amount,
          currency : "INR",
          receipt : formData.receipt
        },
        {
          headers:{
            AccessToken:userData.accessToken,
            Userid: userData.userId
          }
        }
      )
      const params = res.data;
      console.log(params)
      var options = {
        key: "rzp_test_4qz7S7xrRrizgo", // Enter the Key ID generated from the Dashboard
        amount: params.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: params.id        , //This is a sample Order ID. Pass the id obtained in the response of Step 1
        handler: function (response){
          setRazorData(response)
          console.log(RazorData);

          validatePayment()
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
        }
        var pay = new window.Razorpay(options)
        pay.on('payment.failed', function (response){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
       })
      //   pay.on('payment.success', function (response){
      //     setRazorData({
      //       razorpay_payment_id: response.razorpay_payment_id,
      //      razorpay_order_id: response.razorpay_order_id,   
      //      razorpay_signature: response.razorpay_signature,     
      //     })
      //     validatePayment()
      //  })
        pay.open()


    } catch(err) {
      console.log(`An error has occured: ${err}`)
    }
  }


  return (
    <>
  {
    lloading ? 'Loading........' :
    (
      <>
          {
      showBuy ? (
        
        <div>
         {
          SuccessMsg &&  <p className={styles['reset-link-msg']} >Payment successful, Thanks</p>
        }
        <form className={styles.form}>
          <h1>Buy License</h1>
  
        <div>
        <p>Number of credits</p>
        <input 
                type="number" 
                name='CreditNo' 
                value={formData.CreditNo}
                onChange={handleChange}
                className={styles.addID2} />
        </div>
        <h4>Price {formData.amount} Rs</h4>
  
        <div className='license_btns'>
        <button onClick={handleBuy}>Buy</button>
            <button onClick={() => setShowBuy(false)}>Cancel</button>
        </div>
  
        </form>
      </div>
      ) :
      (
        <>
      <h1>License Information</h1>
    <div className='license_cont'>

    <>
          <h3>Number of credits available: {LicenseData.creditsAvailable}</h3>
          { trialmsg && <p>Trial license Activated</p>}
          <div className='license_btns'>
            {
            !LicenseData.trialLicenceUsedOnce && <button onClick={() => {trialLicense()}}>Activate trial license</button>
              
            }
            {/* <button onClick={() => {resetTrialLicense()}}>Reset</button> */}
          <button onClick={() => setShowBuy(true)}>Buy license</button>
          </div>
          </>
    </div>
        </>
      )
    }
      </>
    )
  }

    </>
  )
}

export default LicensePage
