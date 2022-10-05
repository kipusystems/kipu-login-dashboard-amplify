import TableList from './TableList.js'
import CardList from './CardList.js'
import Pagination from '../pagination/Pagination.js'
import Spinner from 'react-spinner-material';
import { useSelector, useDispatch } from 'react-redux'
import { resetQueryResult } from '../features/accounts/querySlice'
import { displayMessage } from '../features/toggle/displayMessageSlice'
import { toggleQueryResult } from '../features/toggle/showQueryResultSlice'
import RefreshIcon from 'mdi-react/RefreshIcon';

function Dashboard() {

  const toggleValue = useSelector(state => state.toggleView.value);
  const accounts = useSelector(state => state.accounts.value);
  const displayQueryAccounts = useSelector(state => state.showQueryResult.value);
  const queryAccounts = useSelector(state => state.queryResult.value);
  const showMessage = useSelector(state => state.displayMessage.value);
  const offSetValues = useSelector(state => state.offset.value);
  const messageBody = useSelector(state => state.messageBody.value);
  const isLoading = useSelector(state => state.isLoading.value);

  const dispatch = useDispatch();

  function renderAccounts(){
    if(isLoading === true){
      return(
        <div data-test="spinner" class="tw-w-1/3 md:tw-w-1/12 tw-mx-auto tw-px-5">
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
                data-test="reset-search"
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

  function renderPagination(){
    return isLoading !== true ? <Pagination/> : ''
  }


  return (
    <div>
      <div className="tw-py-8 lg:tw-py-12 lg:tw-mx-12">
        <div className="tw-w-11/12 md:tw-w-4/6 tw-mx-auto tw-text-left tw-mb-4">
          <div className="tw-text-left">
            <h1 data-test="list-header" className="tw-text-2xl">Locations</h1>
          </div>
        </div>
        {renderAccounts()}
        {renderPagination()}
      </div>
    </div>
  )
}

export default Dashboard;