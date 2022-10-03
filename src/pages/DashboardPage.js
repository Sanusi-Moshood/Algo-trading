import React from 'react'
// Here is where the user data is from
import { AccountContext } from '../context/Account'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { useContext,useState, useEffect } from 'react'
import axios from 'axios'
import styles from './dashboard.module.css'
import { 
  MDBTable, MDBTableHead,
  MDBTableBody,
  MDBRow, MDBCol, MDBContainer, MDBBtn,
  MDBPagination, MDBPaginationLink, MDBPaginationItem
 } from 'mdb-react-ui-kit'
import { useMemo } from 'react'


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
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentPage, setcurrentPage] = useState(1);
    const [dataPerPage] = useState(15)



    //-----------------------------------------
    // This useEffect should run every time url changes but we can leave that for now
    useEffect(() => {
      if (status){
        if (sort === 'Group') {
          getGroupData()
        }else if (sort === 'Account') {
          getAccountData()
        }else if (sort === 'Order Id'){
          getOrderIdData()
        }else {
          getAllData()
        }
      }
      
    }, [sort]);

    const sortAll = (e) => {
      e.preventDefault()
      setSort('All')
    }
    //------------------------------------------
    const getAllData = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          "https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/all"
        )
        const products = res.data;
        setData(products.orders)
        console.log(products)
        setLoading(false)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }
    const getAccountData = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/account/Grp_2_Account_1`
        )
        const products = res.data;
        setData(products)
        console.log(products)
        setLoading(false)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }
    const getGroupData = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/group/GroupID2`
        )
        const products = res.data;
        setData(products)
        console.log(products)
        setLoading(false)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }
    const getOrderIdData = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/220303000308278/all`
        )
        const products = res.data;
        setData(products)
        setLoading(false)
        console.log(products)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }


    
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


    <>
    <div className={styles.dashPage}>
      <h1>Orders Status </h1>
      <div className={styles.sort}>
      <p>Sort by:  </p> 
      <button className={styles.all_btn} onClick={sortAll}>All</button>
      <div>
      <label>By Group: </label>
      <select  value={sort} onChange={e=>setSort(e.target.value)}>
      <option disabled selected >By Group</option>
      <option>Group</option>
      <option>Group 2</option>
      <option>Group 3</option>
      </select>
      </div>
      <div>
      <label>By Account: </label>
      <select  value={sort} onChange={e=>setSort(e.target.value)}>
      <option disabled selected >By Account</option>
      <option>Account</option>
      <option>Account 2</option>
      <option>Account 3</option>
      </select>
      </div>


      </div>
    </div>

      <MDBRow>
      <MDBCol size="12">
        <MDBTable bordered responsive striped>
          <MDBTableHead className={styles.table_color}>
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
              loading ?  
              (
                <MDBTableBody className='align-center mb-0'>
                <tr>
                  <td className="text-center mb-0" colSpan={12}>Loading.......</td>
                </tr>
              </MDBTableBody>
              )
              :
              (
                currentPosts.map((item) => (
                  <MDBTableBody key={item.order_id} >
                    <tr className={styles.t_row}>
                      <td className={styles.t_td}>{item.order_id}</td>
                      <td className={styles.t_td}>{item.order_timestamp}</td>
                      <td className={styles.t_td} >{item.account}</td>
                      <td className={styles.t_td} >{item.group}</td>
                      <td className={styles.t_td} >{item.tradingsymbol}</td>
                      <td className={styles.t_td} >{item.product}</td>
                      <td className={styles.t_td} >{item.quantity}</td>
                      <td className={styles.t_td} >{item.price}</td>
                      <td className={styles.t_td} >{item.transaction_type}</td>
                      <td className={styles.t_td} >{item.status}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )


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