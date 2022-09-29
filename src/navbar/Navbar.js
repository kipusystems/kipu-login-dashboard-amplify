import { useSelector, useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify';
import Alerts from '../alert/Alerts'
import { setAlert, resetAlert } from '../features/alerts/alertSlice'

function Navbar(){

  const currentUser = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const signoutAlert = {body: 'You have successfully signed out', 
                        type: 'success', 
                        visible: true}

  async function signOut(){
    await Auth.signOut().then(() => {
      dispatch(setAlert(signoutAlert))
      setTimeout(() => {
        dispatch(resetAlert())
      }, 5000)
    });
  }

  return (
    <div>
      <header className="tw-bg-k-purple tw-py-5 tw-shadow-sm tw-mb-2 lg:tw-static lg:tw-overflow-y-visible">
        <div className="tw-text-right tw-px-4">
          { currentUser.email === '' ? '' : <button data-test="sign-out" className="tw-inline-flex tw-justify-center tw-px-4 tw-border-2 tw-border-transparent tw-font-semibold tw-rounded-full tw-uppercase hover:tw-cursor-pointer tw-text-sm tw-py-2 tw-text-white tw-bg-k-dark-blue active:tw-bg-k-dark-blue hover:tw-bg-k-true-blue focus:tw-outline-none focus:tw-bg-k-true-blue focus:tw-ring-2 focus:tw-ring-k-dark-blue disabled:tw-bg-k-gray-300 disabled:tw-text-k-gray-700 tw-shadow-md" onClick={ signOut }>Sign Out</button>}  
        </div>
      </header>
      <Alerts/>
    </div>
  );
}

export default Navbar;