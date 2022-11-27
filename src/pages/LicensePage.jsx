import { AccountContext } from '../context/Account';
import {useContext, useState, useEffect} from 'react'
import axios from 'axios'



const LicensePage = () => {
  const {userData} = useContext(AccountContext)
  const [loading, setLoading] = useState(false)
  const [LicenseData, setLicenseData] = useState()

  useEffect(() => {
    // getLicenseData()
  }, [])

  // const getLicenseData =  async () => {
  //   setLoading(true)
  // try {
  //   const res =  await axios
  //   .get(
  //     'https://copytraderapi.fnoalgo.com/licence/licence/1383',
  //     {
  //       headers:{
  //         AccessToken:userData.accessToken,
  //         Userid: userData.userId
  //       }
  //     }
  //   )
  //   const params = res.data;
  //   setLicenseData(params)
  //   setLoading(false)
  //   console.log(params);
  // } catch(err) {
  //   console.log(`An error has occured: ${err}`)
  // }
  // }




  return (
    <>
      <h1>License Information</h1>

    <div className='license_cont'>
    {
        loading ? 'Loading........' :
        (
          <>
          <h3>Number of credits available: 33</h3>

          <div className='license_btns'>
          <button>Activate trial license</button>
          <button>Buy license</button>
          </div>
          </>
        )
      }
    </div>
    </>
  )
}

export default LicensePage
