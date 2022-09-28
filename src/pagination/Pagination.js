import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ChevronLeft from 'mdi-react/ChevronLeftIcon';
import ChevronRight from 'mdi-react/ChevronRightIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import MenuDown from 'mdi-react/MenuDownIcon';
import { useSelector, useDispatch } from 'react-redux'
import { goToPage, nextPage, prevPage } from '../features/pagination/paginationSlice'
import { updateRowsPerPage } from '../features/pagination/perPageSlice'
import { updateOffsetValues } from '../features/pagination/offsetSlice'

function Pagination() {

  const currentPage = useSelector(state => state.page.value);
  const perPage = useSelector(state => state.rowsPerPage.value);
  const accounts = useSelector(state => state.accounts.value)
  const queryResults = useSelector(state => state.query.value)
  const totalAccounts = queryResults.length === 0 ? accounts.length : queryResults.length;
  const offSetValues = useSelector(state => state.offset.value);
  const lastPageNumber = Math.ceil(totalAccounts/perPage)
  const pagesArr = Array.from(Array(lastPageNumber).keys()).map(x => x + 1)
  const dispatch = useDispatch();

  const [showList, setShowList] = useState(false);

  function toggleList(){
    return setShowList(!showList)
  }

  function clickNext(){
    if(currentPage !== lastPageNumber){
      return dispatch(nextPage())
    }
  }

  function clickPrev(){
    if(!(currentPage <= 1)){
      return dispatch(prevPage())
    }
  }

  function dropdownIcon(){
    return(
      showList === true ? <MenuUp/> : <MenuDown/>
    )
  }

  function setOffsetValues(){
    let indexStart = perPage * (currentPage -1)
    let indexEnd = indexStart + perPage
    return dispatch(updateOffsetValues({start: indexStart, end: indexEnd}))
  }

  function highlightPage(selection){
    return selection === perPage
  }

  function dropdownList(){
    let opts = [5, 10, 25, 50, 100]
    let optionsForSelect = opts.map(x => 
      <li className="tw-text-gray-900 tw-cursor-default tw-select-none tw-relative tw-py-2 tw-px-4 tw-m-0 hover:tw-bg-k-purple-500 hover:tw-text-white" onClick={() => dispatch(updateRowsPerPage(x))} key={x}>
        <span className={classNames({
          'tw-block': true,
          'tw-truncate': true,
          'tw-font-semibold': highlightPage(x)
        })}>
          {x}
        </span>
      </li>
    )
    if(showList === true){
      return(
        <div>
          <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3" className="tw-absolute tw-list-none tw-z-10 tw-mt-1 tw-w-full tw-bg-white tw-shadow-lg tw-max-h-60 tw-rounded-md tw-py-1 tw-text-base tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-overflow-auto focus:tw-outline-none sm:tw-text-sm">
            {optionsForSelect}
          </ul>
        </div>
      )
    }
  }

  function pageNeighbors(page){
    return [page -1, page + 1]
  }

  function pageLink(page){
    return (
      <button className={classNames({
        'tw-bg-white': page !== currentPage,
        'md:tw-inline-flex': true,
        'tw-relative': true,
        'tw-items-center': true,
        'tw-text-sm': true,
        'tw-font-medium': true,
        'tw-justify-center': true,
        'hover:tw-bg-k-true-blue-50': true,
        'hover:tw-text-k-true-blue-800': true,
        'md:tw-p-3': true,
        'tw-leading-9': true,
        'tw-h-9': true,
        'tw-w-9': true,
        'tw-rounded': true,
        'tw-text-white': page === currentPage,
        'tw-bg-k-purple-600': page === currentPage,
      })} data-test="page-link" onClick={() => dispatch(goToPage(page))} key={page}>{page}</button>
    )
  }

  function beginningPages(){
    let pages = [1, 2, 3]
    if(currentPage === 1 && lastPageNumber > (currentPage + 1)){
      return [pageLink(pages[0]), pageLink(pages[1])]
    }
    if(currentPage === 1 && lastPageNumber === 2){
      return [pageLink(pages[0]), pageLink(pages[1])]
    }
    if(currentPage === 1 && lastPageNumber === 1){
      return pageLink(pages[0])
    }
    if(currentPage === 2 && lastPageNumber >= (currentPage + 1)){
      return pages.map(page => pageLink(page))
    }
    if(currentPage > 2){
      return pageLink(pages[0])
    }
  }

  function firstThreePages(){
    return pagesArr.slice(0, 3)
  };

  function lastThreePages(){
    return pagesArr.slice(-3)
  };

  function showElipses(pages){
    if(!pages.includes(currentPage)){
      return <span className="tw-bg-white tw-relative tw-items-center tw-text-sm tw-font-medium tw-p-1">...</span>
    }
  }

  function innerPages(){
    let sibs = pageNeighbors(currentPage)
     if(currentPage >= 3 && currentPage < lastPageNumber){
      let pages = [sibs[0], currentPage, sibs[1]]
      return pages.map(page => pageLink(page))
     }
  }

  function endPages(){
    let pages = [lastPageNumber - 2, lastPageNumber - 1, lastPageNumber]
    if(currentPage === lastPageNumber && lastPageNumber > 1){
      return [pageLink(pages[1]), pageLink(pages[2])]
    }
    if(currentPage < lastPageNumber - 1){
      return pageLink(pages[2])
    }
  }

  function endCountNumber(){
    return offSetValues.end > totalAccounts ? '' : ` - ${offSetValues.end}`
  }

  useEffect(() => {
    setOffsetValues();
  }, [perPage, currentPage]);

  return (
    <div className="xs:tw-flex-col md:tw-flex tw-items-center tw-w-full tw-mx-auto tw-mt-4 md:tw-space-x-8 md:tw-place-content-end md:tw-w-4/6">
      {/* dropdown */}
      <div className="tw-hidden md:tw-inline-flex tw-space-x-4 tw-items-center">
        <div>
          <p className="tw-text-sm tw-mb-0">Rows per page</p>
        </div>
        <div>
          <div className="tw-relative tw-group tw-flex">
            <div className="tw-relative tw-w-full">
              <button onClick={toggleList} data-skip-legacy="true" type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="tw-relative tw-w-full tw-bg-white tw-border tw-border-solid tw-rounded-md tw-border-gray-500 tw-h-11 tw-pl-3 tw-pr-10 tw-py-2 tw-text-left tw-cursor-default focus:tw-outline-none focus:tw-border-k-purple sm:tw-text-sm tw-border-k-gray-500">
                <span className="block truncate">
                  {perPage}
                </span>
                <span className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 tw-pointer-events-none">
                  {dropdownIcon()}
                </span>
              </button>
              {dropdownList()}
            </div>
          </div>
        </div>
      </div>
      {/* page x of _ */}
      <div className="tw-mb-4 md:tw-mb-0">
        <p className="tw-text-sm tw-text-gray-700 tw-mb-0">{offSetValues.start + 1} {endCountNumber()} of <span id="total-accounts">{totalAccounts}</span> accounts</p>
      </div>
      {/* buttons */}
      <div className="tw-bg-white tw-mx-auto tw-py-3">
        <div className="tw-flex tw-items-center tw-justify-center md:tw-flex-row-reverse">
          <div className="tw-flex tw-space-x-10 tw-items-center tw-justify-between">
            <nav className="tw-relative tw-space-x-3 tw-z-0 tw-inline-flex">
              <span data-test="left-arrow" onClick={clickPrev} className="tw-relative tw-inline-flex tw-items-center tw-bg-white tw-text-sm tw-font-medium tw-text-gray-700 tw-text-lg hover:tw-bg-k-true-blue-50 tw-leading-9 tw-h-9 tw-w-9 tw-group tw-rounded tw-cursor-pointer"><i className="tw-mx-auto group-hover:tw-text-k-gray-700"><ChevronLeft/></i></span>
              {beginningPages()}
              {showElipses(firstThreePages())}
              {innerPages()}
              {showElipses(lastThreePages())}
              {endPages()}
              <span data-test="right-arrow" onClick={clickNext} className="tw-relative tw-inline-flex tw-items-center tw-bg-white tw-text-sm tw-font-medium tw-text-gray-700 tw-text-lg hover:tw-bg-k-true-blue-50 tw-leading-9 tw-h-9 tw-w-9 tw-group tw-rounded tw-cursor-pointer"><i className="mdi mdi-chevron-right tw-mx-auto group-hover:tw-text-k-gray-700"><ChevronRight/></i></span>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination;