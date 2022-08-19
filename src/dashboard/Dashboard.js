import React, { useState } from 'react';
import TableList from './TableList.js'
import CardList from './CardList.js'
import Search from './Search.js'
import Logo from '../assets/images/health-logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { toggleView } from '../features/toggle/toggleSlice'

function Dashboard() {

  const toggleValue = useSelector(state => state.toggle.value);
  const dispatch = useDispatch();

  function goToInstance(e, instId){
    console.log(instId)
    console.log('hey man')
  }

  var fakeInstances = [
    {
      locationName: 'Mario\'s House',
      id: 1,
      address: '123 Fake St. Miami, Fl. 33139',
      logo: Logo
    },
    {
      locationName: 'Isaac\'s House',
      id: 2,
      address: '123 Fake St. Miami, Fl. 33139',
      logo: Logo
    },
    {
      locationName: 'Sophie\'s House',
      id: 3,
      address: '123 Fake St. Miami, Fl. 33139',
      logo: Logo
    },
    {
      locationName: 'Paul\'s House',
      id: 4,
      address: '123 Fake St. Miami, Fl. 33139',
      logo: Logo
    },
    {
      locationName: 'Mana\'s House',
      id: 5,
      address: '123 Fake St. Miami, Fl. 33139',
      logo: Logo
    }
  ]

  function toggleBtn(){
    dispatch(toggleView());
  }

  return (
    <div>
      <div className="tw-py-32 tw-mx-12">
        <div className="tw-w-4/6 tw-grid tw-grid-cols-3 tw-mx-auto tw-items-center tw-justify-center tw-mb-4">
          <div className="tw-text-left">
            <h1 className="tw-text-2xl">Location List</h1>
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
          </div>
        </div>
        { toggleValue ? <CardList instances={fakeInstances} goToInstance={goToInstance}/> : <TableList instances={fakeInstances} goToInstance={goToInstance}/> }
      </div>
    </div>
  )
}

export default Dashboard;