function Table(props){

  var items = props.instances.map(function(inst){
    return(
      <tr className="tw-border-solid tw-border-b tw-border-gray-200 hover:tw-bg-k-purple-50 tw-group" key={inst.kipu_instance_id}> 
        <td className="tw-px-2 tw-text-left sm:tw-text-sm md:tw-text-md tw-py-3">{inst.instance_name}</td>
        {/* <td className="tw-px-2 tw-text-left sm:tw-text-sm md:tw-text-md tw-py-3">{inst.address}</td> */}
        {/* <td className="tw-px-2 tw-text-left sm:tw-text-sm md:tw-text-md tw-py-3">{inst.roles}</td> */}
        {/* <td className="tw-px-2 sm:tw-text-sm md:tw-text-md tw-py-3"></td>  */}
        <td className="tw-px-2 tw-py-3">
          <a href={`#${inst.id}`} className="tw-text-k-purple tw-uppercase tw-font-medium">Launch</a> 
          <button data-bs-toggle="collapse" data-bs-target="#collapseOne" data-skip-legacy="true" className="tw-text-k-gray-900 tw-font-medium tw-accordion-button tw-border-none tw-bg-transparent">
            <i className="tw-mr-2 mdi mdi-chevron-down group-hover:tw-text-k-purple"></i>
          </button>
        </td>
      </tr>
    );
  })

  return(
    <div className="tw-p-8 tw-w-4/6 tw-mx-auto tw-border tw-rounded tw-shadow">
      <table className="tw-table-auto tw-w-full">
        <thead>
          <tr className="tw-text-left tw-text-base tw-font-normal tw-border-b tw-relative">
            <th className="tw-font-medium tw-p-2 tw-text-sm">Location Name </th> 
            {/* <th className="tw-font-normal tw-p-2 tw-text-sm">Address </th>  */}
            {/* <th className="tw-font-normal tw-p-2 tw-text-sm">Role </th> 
            <th className="tw-font-normal tw-p-2 tw-text-sm">Role </th>  */}
            <th className="tw-font-normal tw-p-2 tw-text-sm"></th> 
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    </div>
  )
}

export default Table;