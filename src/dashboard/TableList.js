function Table(props){

  var items = props.accounts.map(function(acct){
    return(
      <tr className="tw-border-solid tw-border-b tw-border-gray-200 hover:tw-bg-k-purple-50 tw-group" key={acct.account_id}> 
        <td className="tw-px-2 tw-text-left sm:tw-text-sm md:tw-text-md tw-py-3">{acct.account_name}</td>
        <td className="tw-px-2 tw-py-3">
          <a target="_blank" rel="noreferrer" href={acct.account_url} className="tw-text-k-purple tw-uppercase tw-font-medium">Launch</a> 
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