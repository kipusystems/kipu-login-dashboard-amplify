function Search(){
  return(
    <div className="tw-transition tw-ease-in-out tw-duration-200 tw-relative tw-col-span-full tw-col-start-1" width="full" borderradius="rounded-full" items="[object Object],[object Object],[object Object],[object Object]" filteroptions="[object Object]">
      <div>
        <div>
          <div className="tw-relative tw-group tw-flex tw-w-full">
            <input placeholder="Search" className="tw-h-10 tw-border tw-border-solid tw-px-2 tw-py-0 tw-text-base tw-leading-4 tw-w-full focus:tw-outline-none focus:tw-border-2 focus:tw-border-k-purple-400 hover:tw-shadow tw-border-k-gray-500 tw-text-black tw-pl-9 tw-rounded-full tw-bg-white tw-pr-0"></input>
              <i className="mdi mdi-magnify tw-pt-2 tw-absolute tw-cursor-pointer tw-text-lg tw-left-4 tw-text-k-gray-800"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search;