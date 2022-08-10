import React, { useState } from 'react';
import Logo from '../assets/images/health-logo.png'

function Dashboard() {

  function goToInstance(e, instId){
    console.log(instId)
    console.log('hey man')
  }

  var fakeInstances = [
    {
      locationName: 'Mario\'s House',
      id: 1,
      logo: Logo
    },
    {
      locationName: 'Isaac\'s House',
      id: 2,
      logo: Logo
    },
    {
      locationName: 'Sophie\'s House',
      id: 3,
      logo: Logo
    },
    {
      locationName: 'Paul\'s House',
      id: 4,
      logo: Logo
    },
    {
      locationName: 'Mana\'s House',
      id: 5,
      logo: Logo
    }
  ]

  // const [instances, setInstances] = useState([])

  var instanceList = fakeInstances.map(function(inst){
    return(
      <div className="tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-md tw-w-full tw-cursor-pointer tw-my-4" widthoption="large" aligncontent="left" key={inst.id}>
        <img src={inst.logo} alt="logo"/>
        <div className="tw-px-4 tw-py-5 sm:tw-px-6">
          {inst.locationName}
        </div>
        <div className="tw-px-4 tw-py-5 sm:tw-px-6">
          <button className="tw-inline-flex tw-justify-center tw-px-4 tw-border-2 tw-border-transparent tw-font-semibold tw-rounded-full tw-uppercase hover:tw-cursor-pointer tw-text-sm tw-py-2 tw-text-white tw-bg-k-dark-blue active:tw-bg-k-dark-blue hover:tw-bg-k-true-blue focus:tw-outline-none focus:tw-bg-k-true-blue focus:tw-ring-2 focus:tw-ring-k-dark-blue disabled:tw-bg-k-gray-300 disabled:tw-text-k-gray-700 tw-shadow-md" onClick={event => goToInstance(event, inst.id)}>Go to Instance</button>
        </div>
      </div>
    );
  })

  return (
    <div className="tw-grid tw-gap-12 tw-grid-cols-6 tw-py-32 tw-mx-12 tw-justify-items-center">
      {instanceList}
    </div>
  )
}

export default Dashboard;