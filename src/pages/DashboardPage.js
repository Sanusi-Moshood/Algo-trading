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
    const [sortOption, setSortOption]=useState('')
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setcurrentPage] = useState(1);
    const [dataPerPage] = useState(15)
    const [masterOrderId, setMasterOrderId] = useState('')
    const [GroupId, setGroupId] = useState([])
    const [AccountId, setAccountId] = useState([])



    //-----------------------------------------
    useEffect(() => {
      getGroupId()
      getAccountId()
    }, [])
    useEffect(() => {

      if (status){
        if (sort === 'Group') {
          getGroupData()
        }else if (sort === 'Account') {
          getAccountData()
        }else if (sort === 'Master'){
          getMasterData()
        }else if (sort === 'Order History by OrderId'){
          getOrderHistory()
        }else if (sort === 'Last Order by OrderId'){
          getLastOrder()
        }
        else {
          getAllData()
        }
      }

    }, [sort, sortOption]);

    const sortAll = (e) => {
      e.preventDefault()
      setSort('All')
    }
    //------------------------------------------
    const getGroupId =  async () => {
    setLoading(true)
    try {
      const res =  await axios
      .get(
        "https://copytraderapi.fnoalgo.com/accounts/accounts/1434/groups/ids",
        {
          headers:{
            AccessToken:userData.accessToken,
            Userid: userData.userId
          }
        }
      )
      const GroupIds = res.data;
      setGroupId(GroupIds.groups)
      // console.log(GroupIds)
    } catch(err) {
      console.log(`An error has occured: ${err}`)
    }
  }
    const getAccountId =  async () => {
    setLoading(true)
    try {
      const res =  await axios
      .get(
        "https://copytraderapi.fnoalgo.com/accounts/accounts/1434/accounts/ids",
        {
          headers:{
            AccessToken:userData.accessToken,
            Userid: userData.userId
          }
        }
      )
      const AccountIds = res.data;
      setAccountId(AccountIds.accounts)
      // console.log(AccountIds)
    } catch(err) {
      console.log(`An error has occured: ${err}`)
    }
  }


    const getAllData = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          "https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/all",
          {
            headers:{
              AccessToken:userData.accessToken,
              Userid: userData.userId
            }
          }
        )
        const products = res.data;
        setData(products.orders)
        // console.log(products)
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
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/group/${sortOption}`,
          {
            headers:{
              AccessToken:userData.accessToken,
              Userid: userData.userId
            }
          }
        )
        const products = res.data;
        setData(products)
        // console.log(products)
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
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/account/${sortOption}`,
          {
            headers:{
              AccessToken:userData.accessToken,
              Userid: userData.userId
            }
          }
        )
        const products = res.data;
        setData(products)
        // console.log(products)
        setLoading(false)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }

    const getOrderHistory = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/${sortOption}/all`,
          {
            headers:{
              AccessToken:userData.accessToken,
              Userid: userData.userId
            }
          }
        )
        const products = res.data;
        const filter = products.filter((element) => typeof element != 'string')
        setData(filter)
        // console.log(filter)
        setLoading(false)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }
    const getLastOrder = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/${sortOption}/latest`,
          {
            headers:{
              AccessToken:userData.accessToken,
              Userid: userData.userId
            }
          }
        )
        const products = res.data;
        setData([products])
        // console.log(products)
        setLoading(false)
      } catch(err) {
        console.log(`An error has occured: ${err}`)
      }
    }
    const getMasterData = async () => {
      setLoading(true)
      try {
        const res =  await axios
        .get(
          `https://copytraderapi.fnoalgo.com/orders/tradeorders/1383/master/${sortOption}`,
          {
            headers:{
              AccessToken:userData.accessToken,
              Userid: userData.userId
            }
          }
        )
        const products = res.data;
        setData(products)
        setLoading(false)
        // console.log(products)
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
      <div className={styles.sort_list}>
      <button className={styles.all_btn} onClick={sortAll}>All</button>
      <div>
      <label>By Group: </label>
      <select  value={sort} onChange={e=> {
        setSortOption(e.target.value) 
        setSort('Group')
        } }>
      <option   >By Group</option>
      {
        GroupId.map((Id) => (<option key={Id}>{Id}</option>))
      }
      </select>
      </div>
      <div>
      <label>By Account: </label>
      <select  value={sortOption} onChange={e=> {
        setSortOption(e.target.value) 
        setSort('Account')
        } }>
      <option   >By Account</option>
      {
        AccountId.map((Id) => (<option key={Id}>{Id}</option>))
      }
      </select>
      </div>
      <div>
      <label>By Order Id: </label>
      <input type="text" name="masterOrderId" value={masterOrderId} placeholder='OrderId' onChange={e=>setMasterOrderId(e.target.value)}/>
      <button className={styles.all_btn} onClick={() => {
        if(masterOrderId != ''){
          setSortOption(masterOrderId)
          setSort('Master')
        }
        }}>Go</button>
      <select  value={sort} onChange={e=> {
        if(masterOrderId != ''){
        setSort(e.target.value)
        setSortOption(masterOrderId)
        }
      }}>
      <option >By Order Id</option>
      <option>Order History by OrderId</option>
      <option>Last Order by OrderId</option>
      </select>
      </div>
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
          {!loading && data.length === 0 ?
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