function CardList(props){

  var instanceCards = props.instances.map(function(inst){
    return(
      <div className="tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-md tw-w-full tw-cursor-pointer tw-my-4" widthoption="large" aligncontent="left" key={inst.kipu_instance_id}>
        <div className="tw-px-4 tw-py-5 sm:tw-px-6">
          {inst.instance_name}
        </div>
        <div className="tw-px-4 tw-py-5 sm:tw-px-6">
          <button className="tw-inline-flex tw-justify-center tw-px-4 tw-border-2 tw-border-transparent tw-font-semibold tw-rounded-full tw-uppercase hover:tw-cursor-pointer tw-text-sm tw-py-2 tw-text-white tw-bg-k-dark-blue active:tw-bg-k-dark-blue hover:tw-bg-k-true-blue focus:tw-outline-none focus:tw-bg-k-true-blue focus:tw-ring-2 focus:tw-ring-k-dark-blue disabled:tw-bg-k-gray-300 disabled:tw-text-k-gray-700 tw-shadow-md" onClick={event => props.goToInstance(event, inst.subdomain)}>Go to Instance</button>
        </div>
      </div>  
    );
  })

  return(
    <div className="tw-w-4/6 tw-mx-auto tw-grid tw-gap-8 tw-grid-cols-4 tw-justify-items-center">
      {instanceCards}
    </div>
  )
}

export default CardList;