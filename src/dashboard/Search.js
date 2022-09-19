import { useSelector, useDispatch } from 'react-redux'
import { updateQueryResult, resetQueryResult } from '../features/accounts/querySlice'
import { toggleQueryResult } from '../features/toggle/showQueryResultSlice'
import { displayMessage } from '../features/toggle/displayMessageSlice'
import { messageBody } from '../features/messages/contentSlice'

function Search(){
  const accounts = useSelector(state => state.accounts.value);  
  const dispatch = useDispatch();

  function initSearch(e){
    if(e.target.value === ''){
      dispatch(toggleQueryResult(false));
      dispatch(displayMessage(false));
      return dispatch(resetQueryResult())
    }

    let result = accounts.filter(function (acct) { return acct.account_name.toLowerCase().includes(e.target.value.toLowerCase()); });
    console.log(result)
    if(result.length !== 0){
      dispatch(toggleQueryResult(true));
      dispatch(displayMessage(false));
      dispatch(updateQueryResult(result))
    }else{
      dispatch(resetQueryResult())
      dispatch(displayMessage(true));
      dispatch(messageBody('No results'));
    }
  }

  return(
    <div className="tw-transition tw-ease-in-out tw-duration-200 tw-relative tw-col-span-full tw-col-start-1" width="full" borderradius="rounded-full" items="[object Object],[object Object],[object Object],[object Object]" filteroptions="[object Object]">
      <div className="tw-relative tw-group tw-flex tw-w-full">
        <input onChange={initSearch} placeholder="Search" className="tw-h-10 tw-border tw-border-solid tw-px-4 tw-py-0 tw-text-base tw-leading-4 tw-w-full focus:tw-outline-none focus:tw-border-2 focus:tw-border-k-purple-400 hover:tw-shadow tw-border-k-gray-500 tw-text-black tw-rounded-full tw-bg-white tw-pr-0"></input>
          <i className="mdi mdi-magnify tw-pt-2 tw-absolute tw-cursor-pointer tw-text-lg tw-left-4 tw-text-k-gray-800"></i>
      </div>
    </div>
  )
}

export default Search;