import React from 'react'
// Here is where the user data is from
import { AccountContext } from '../context/Account'
import styles from './dashboard.module.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { useContext,useState, useEffect } from 'react'
import axios from 'axios'
import { 
  MDBTable, MDBTableHead,
  MDBTableBody, MDBContainer,
  MDBRow, MDBCol
 } from 'mdb-react-ui-kit'


const DashboardPage = () => {
  //==============================================================
  // the user data is an object ({
  //   accessToken:'',
  //   userId:'',
  //   userName:'',
  //   Email:''
  // })
    const {userData} = useContext(AccountContext)
    //==============================================================

    const [sort, setSort]=useState('All')
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('')

//=============================================
// switch (sort) {
//   case "Group":
//     setUrl("https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/all")
//     break;
//   case "Account":
//     setUrl("")
//     break;
//   case "Order Id":
//     setUrl("")
//     break;

//   default:
//     break;
// }
//=========================================

    //-----------------------------------------
    // This useEffect should run every time url changes but we can leave that for now
    useEffect(() => {
      getAllData();
    }, [url]);

    //------------------------------------------
    const getAllData = async () => {
      return await axios
      .get(
        "https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/all",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "accessToken": userData.accessToken,
            "userId": userData.userId,
          }
        }
      )
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }
    console.log(data)
    
  return (
    // <div className={styles.dashPage}>
    //   <h1>Orders Status</h1>
    //   <div className={styles.sort}>
    //   <p>Sort by {sort}</p> 
    //   <select  value={sort} onChange={e=>setSort(e.target.value)}>
    //   <option>All</option>
    //   <option>Group</option>
    //   <option>Account</option>
    //   <option>Order Id</option>
    //   </select>
    //   </div>
    // </div>

// ********************** AZEEZ CREATE A TABLE COMPONENT HERE 
//*********************** AND INSIDE IT YOU SHOULD CREATE A DUMMY TABLE WITH ALL INFO 
//*********************** I'LL ADD PAGINATION, MAKE API CALL AND MAP OVER THE DATA */

  <MDBRow>
  <MDBCol size="12">
    <MDBTable>
      <MDBTableHead dark>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Status</th>
        </tr>
      </MDBTableHead>
      {data.length === 0 ?
        (
          <MDBTableBody className='align-center mb-0'>
            <tr>
              <td className="text-center mb-0" colSpan={8}>No Data Found</td>
            </tr>
          </MDBTableBody>
        ) : (
          <MDBTableBody>

          </MDBTableBody>
        )
      }
    </MDBTable>
  </MDBCol>
  </MDBRow>

  )
}

export default DashboardPage