import Search from './Search.js'
import RefreshIcon from 'mdi-react/RefreshIcon';
import { useSelector, useDispatch } from 'react-redux'
import { toggleView } from '../features/toggle/toggleSlice'
import { accountFetcher } from '../functions/Fetcher'
import { updateAccounts } from '../features/accounts/accountSlice'
import { updateLoadingStatus } from '../features/accounts/isLoadingSlice'

function Header(){

  const currentUser = useSelector(state => state.user.value);
  const toggleValue = useSelector(state => state.toggleView.value);
  const dispatch = useDispatch();

  function toggleBtn(){
    dispatch(toggleView());
  }

  async function refreshList(){
    dispatch(updateLoadingStatus(true))
    await accountFetcher(currentUser).then(result => {
      dispatch(updateLoadingStatus(false))
      dispatch(updateAccounts(result.data.accounts));
      return true
    });
  }

  return(
    <div>
      <div className="tw-text-center">
        <Search/>
      </div>
      <div className="tw-mt-4 tw-items-center tw-flex tw-flex-row tw-place-content-center md:tw-place-content-end tw-space-x-4">
        <p>Cards</p>
        <button type="button" role="switch" aria-checked="false" className="tw-flex-shrink-0 tw-group tw-relative tw-rounded-full tw-inline-flex tw-items-center tw-justify-center tw-h-5 tw-w-10 tw-cursor-pointer" onClick={toggleBtn}>
          <span id="background" aria-hidden="true" className={`tw-pointer-events-none tw-absolute tw-h-4 tw-w-9 tw-mx-auto tw-rounded-full tw-transition-colors tw-ease-in-out tw-duration-200 ${toggleValue ? "tw-bg-k-true-blue-300" : "tw-bg-gray-200"}`}></span> 
          <span id="switch" aria-hidden="true" className={`tw-bg-white tw-absolute tw-left-0 tw-h-5 tw-w-5 tw-rounded-full tw-shadow tw-transform tw-transition-transform tw-ease-in-out tw-duration-200 tw-block hover:tw-ring-8 ${toggleValue ? "tw-translate-x-5 tw-bg-k-true-blue-600" : "tw-translate-x-0 tw-bg-white"}`}></span>
        </button>
        <p>Table</p>
        <button data-test="refresh-button" onClick={refreshList}><RefreshIcon/></button>
      </div>
    </div>
  )
}

export default Header;