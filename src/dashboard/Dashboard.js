import TableList from './TableList.js'
import CardList from './CardList.js'
import Search from './Search.js'
import Pagination from '../pagination/Pagination.js'
import Spinner from 'react-spinner-material';
import { useSelector, useDispatch } from 'react-redux'
import { toggleView } from '../features/toggle/toggleSlice'
import { accountFetcher } from '../functions/Fetcher'
import { updateAccounts } from '../features/accounts/accountSlice'
import { resetQueryResult } from '../features/accounts/querySlice'
import { displayMessage } from '../features/toggle/displayMessageSlice'
import { toggleQueryResult } from '../features/toggle/showQueryResultSlice'
import { updateLoadingStatus } from '../features/accounts/isLoadingSlice'


import RefreshIcon from 'mdi-react/RefreshIcon';

function Dashboard() {

  const currentUser = useSelector(state => state.user.value);
  const toggleValue = useSelector(state => state.toggle.value);
  const accounts = useSelector(state => state.accounts.value);
  const displayQueryAccounts = useSelector(state => state.showQueryResult.value);
  const queryAccounts = useSelector(state => state.query.value);
  const showMessage = useSelector(state => state.displayMessage.value);
  const offSetValues = useSelector(state => state.offset.value);
  const messageBody = useSelector(state => state.messageBody.value);
  const isLoading = useSelector(state => state.isLoading.value);

  const dispatch = useDispatch();

  async function refreshList(){
    dispatch(updateLoadingStatus(true))
    await accountFetcher(currentUser).then(result => {
      dispatch(updateLoadingStatus(false))
      dispatch(updateAccounts(result.data.accounts));
      return true
    });
  }

  function toggleBtn(){
    dispatch(toggleView());
  }

  function renderAccounts(){
    if(isLoading === true){
      return(
        <div class="tw-w-1/12 tw-mx-auto tw-px-5">
          <Spinner radius={90} color={"#501270"} stroke={5} visible={true} />
        </div>
      )
    }
    if(showMessage){
      return(
        <div className="tw-w-4/6 tw-mx-auto tw-justify-items-center tw-mt-12">
          <div className="tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-md tw-w-1/2 tw-mx-auto">
            <div data-test="message-header" className="tw-px-4 tw-py-5 sm:tw-px-6">
              {messageBody}
            </div>
            <div className="tw-px-4 tw-py-5 sm:tw-px-6">
              <button 
                className="tw-inline-flex tw-justify-center tw-px-4 tw-border-2 tw-border-transparent tw-font-semibold tw-rounded-full tw-uppercase hover:tw-cursor-pointer tw-text-sm tw-py-2 tw-text-white tw-bg-k-dark-blue active:tw-bg-k-dark-blue hover:tw-bg-k-true-blue focus:tw-outline-none focus:tw-bg-k-true-blue focus:tw-ring-2 focus:tw-ring-k-dark-blue disabled:tw-bg-k-gray-300 disabled:tw-text-k-gray-700 tw-shadow-md" 
                onClick={() => {dispatch(resetQueryResult()); dispatch(toggleQueryResult(false)); dispatch(displayMessage(false)); document.getElementById("search-field").value = ''}}>
                  Reset Search
              </button>
            </div>
          </div>
        </div>
      )
    }
    if(displayQueryAccounts){
      return(
        toggleValue ? <CardList accounts={accountsToShow(queryAccounts)}/> : <TableList accounts={accountsToShow(queryAccounts)}/>
      )
    }else{
      return(
        toggleValue ? <CardList accounts={accountsToShow(accounts)}/> : <TableList accounts={accountsToShow(accounts)}/>
      )
    }
  }

  function accountsToShow(accounts){
    let start = offSetValues.start
    let end = offSetValues.end
    return accounts.slice(start, end)
  }


  return (
    <div>
      <div className="tw-py-32 tw-mx-12">
        <div className="tw-w-4/6 tw-grid tw-grid-cols-3 tw-mx-auto tw-items-center tw-justify-center tw-mb-4">
          <div className="tw-text-left">
            <h1 data-test="list-header" className="tw-text-2xl">Location List</h1>
          </div>
          <div className="tw-text-center">
            <Search/>
          </div>
          <div className="tw-flex tw-flex-row tw-place-content-end tw-space-x-4">
            <p>Table View</p>
            <button type="button" role="switch" aria-checked="false" className="tw-flex-shrink-0 tw-group tw-relative tw-rounded-full tw-inline-flex tw-items-center tw-justify-center tw-h-5 tw-w-10 tw-cursor-pointer" onClick={toggleBtn}>
              <span id="background" aria-hidden="true" className={`tw-pointer-events-none tw-absolute tw-h-4 tw-w-9 tw-mx-auto tw-rounded-full tw-transition-colors tw-ease-in-out tw-duration-200 ${toggleValue ? "tw-bg-k-true-blue-300" : "tw-bg-gray-200"}`}></span> 
              <span id="switch" aria-hidden="true" className={`tw-bg-white tw-absolute tw-left-0 tw-h-5 tw-w-5 tw-rounded-full tw-shadow tw-transform tw-transition-transform tw-ease-in-out tw-duration-200 tw-block hover:tw-ring-8 ${toggleValue ? "tw-translate-x-5 tw-bg-k-true-blue-600" : "tw-translate-x-0 tw-bg-white"}`}></span>
            </button>
            <p>Card View</p>
            <button data-test="refresh-button" onClick={refreshList}><RefreshIcon/></button>
          </div>
        </div>
        {renderAccounts()}
        <Pagination/>
      </div>
    </div>
  )
}

export default Dashboard;