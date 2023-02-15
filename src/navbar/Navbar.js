import { useSelector, useDispatch } from 'react-redux'
import { Auth } from 'aws-amplify';
import Alerts from '../alert/Alerts'
import { HelpOutline } from '@material-ui/icons'
import { setAlert, resetAlert } from '../features/alerts/alertSlice'
import Logo from '../assets/images/EMR-White.svg'
import { useState, useEffect, useRef } from 'react';
import { zendeskLink } from '../functions/Zendesk'

function Navbar(){

  const currentUser = useSelector(state => state.user.value);
  const [showOptions, setShowOptions]=useState(false);
  const [listening, setListening]=useState(false);
  const dispatch = useDispatch();
  const signoutAlert = {body: 'You have successfully signed out', 
                        type: 'success', 
                        visible: true}
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside && onClickOutside(event);
    } 
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  const onClickOutside = (e) => {
    setListening(true);
    setShowOptions(false);
    e.stopImmediatePropagation();
  }
  
  function toggleList(e){
       return setShowOptions(!showOptions);     
  }

  function dropdownList(props){
    let opts = ["Help","Sign Out"]
    let optionsForSelect = opts.map((x,index) => 
      <div key={index}>
        <li 
        data-test={opts[index]}
        className="tw-text-black tw-cursor-pointer tw-select-none tw-font-k-sans tw-h-11 tw-mb-1 tw-relative tw-mr-1  tw-text-left tw-py-2.5 tw-px-2 tw-m-0 hover:tw-bg-k-gray-950"
        onClick={()=>{handleOptions(index)}}
        >
          <a  
            key={index}
          >
            {x} 
          </a>
          {index === 0 ? <HelpOutline className='tw-text-black tw-text-xl'/> : ''}
        </li>
        {index !== opts.length-1 ? <hr/>: ''}
      </div>
    )
    if(showOptions === true){
      return(
        <div>
          <ul data-test="menu-list" tabIndex="-1" role="listbox" ref={ref} aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3" className="tw-absolute tw-border-1 tw-right-7 tw-list-none tw-z-10 tw-top-auto tw-w-13 tw-bg-white tw-shadow-lg tw-max-h-60 tw-rounded-md tw-text-base tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-overflow-auto focus:tw-outline-none sm:tw-text-sm">
            {optionsForSelect}
          </ul>
        </div>
      )
    }
  }

  function handleOptions(index) {
    switch(index) {
      case 0: help()
      break;
      case 1: signOut()
      break;
    }
  }

  async function signOut(){
    await Auth.signOut().then(() => {
      dispatch(setAlert(signoutAlert));
      setShowOptions(false);
      setTimeout(() => {
        dispatch(resetAlert())
      }, 5000)
    });
  }

  function help() {
    window.open(zendeskLink(currentUser), '_blank');
  }

  return (
    <div>
      <header className="tw-bg-k-purple tw-shadow-sm tw-grid tw-grid-cols-2 lg:tw-static lg:tw-overflow-y-visible">
        <div className="tw-mx-5 tw-py-5 tw-my-auto">
          <img alt="Kipu Health" className="tw-h-8" src={Logo} />
        </div>
        <div className="tw-flex tw-items-center tw-justify-end tw-text-right tw-py-3 tw-pr-6">
          { currentUser.email === '' ? '' : <div type="button" data-test="initial-logo" className="tw-rounded-round tw-relative tw-w-px-39 tw-h-9 tw-py-px-3.25 tw-px-1.5 tw-border-2 tw-border-white  tw-font-k-sans tw-uppercase hover:tw-cursor-pointer tw-text-white  active:tw-bg-k-purple hover:tw-bg-k-purple-950 disabled:tw-bg-k-gray-300 disabled:tw-text-k-gray-700 tw-shadow-md" onClick={ toggleList }>
              <div className=' tw-absolute tw-m-0 tw-top-1/2 tw-translate-y-r-1/2 tw-items-center tw-flex tw-justify-center'>
                <span className='tw-w-px-23.6 tw-h-px-19 tw-flex tw-items-center tw-justify-center'>{currentUser.initials}</span>
              </div>
            </div> 
          }  
        </div>
      </header>
      {  dropdownList() }
      <Alerts/>
    </div>
  );
}

export default Navbar;