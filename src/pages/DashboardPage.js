import React from 'react'
// Here is where the user data is from
import { AccountContext } from '../context/Account'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { useContext,useState, useEffect } from 'react'
import axios from 'axios'
import { 
  MDBTable, MDBTableHead,
  MDBTableBody,
  MDBRow, MDBCol, MDBContainer, MDBBtn,
  MDBPagination, MDBPaginationLink, MDBPaginationItem
 } from 'mdb-react-ui-kit'


const DashboardPage = () => {
  //==============================================================
  // the user data is an object ({
  //   accessToken:'',
  //   userId:'',
  //   userName:'',
  //   Email:''
  // })
    const {userData, status} = useContext(AccountContext)
    //==============================================================

    const [sort, setSort]=useState('All')
    const [data, setData] = useState([]);
    const [url, setUrl] = useState('');
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentPage, setcurrentPage] = useState(1);
    const [dataPerPage] = useState(4)

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
      if (status){
        getAllData();
      }
      
    }, []);

    
    //------------------------------------------
    const getAllData = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/all?_start=0&_end=5`
        )
        const products = res.data;
        setData(products.orders)
        setLoading(false)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }
    console.log(data)
    //-------------------------------------------------Pagination
    const indexOfLastPost = currentPage * dataPerPage
    const indexOfFirstPost = indexOfLastPost - dataPerPage
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
      pageNumbers.push(i)
    }
    const paginate = (pageNumber) => setcurrentPage(pageNumber)
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
    <>
      <MDBRow>
      <MDBCol size="12">
        <MDBTable bordered responsive striped>
          <MDBTableHead className='table-color'>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Time</th>
              <th scope="col">Account</th>
              <th scope="col">Group</th>
              <th scope="col">Instrument</th>
              <th scope="col">Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Transactions</th>
              <th scope="col">Status</th>
            </tr>
          </MDBTableHead>
          {data.length === 0 ?
            (
              <MDBTableBody className='align-center mb-0'>
                <tr>
                  <td className="text-center mb-0" colSpan={12}>No Data Found</td>
                </tr>
              </MDBTableBody>
            ) : (
              currentPosts.map((item) => (
                <MDBTableBody key={item.order_id} >
                  <tr>
                    <td>{item.order_id}</td>
                    <td>{item.order_timestamp}</td>
                    <td >{item.account}</td>
                    <td >{item.group}</td>
                    <td >{item.tradingsymbol}</td>
                    <td >{item.product}</td>
                    <td >{item.quantity}</td>
                    <td >{item.price}</td>
                    <td >{item.transaction_type}</td>
                    <td >{item.status}</td>
                  </tr>
                </MDBTableBody>
              ))

            )
          }
        </MDBTable>
      </MDBCol>
      </MDBRow>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <span href="!#" className='page-link' onClick={() => paginate(number)}>
                {number}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default DashboardPage