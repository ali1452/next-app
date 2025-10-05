
"use client"
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type IProps= {
    itemsPerPage:number,
    items:any[],
    setSelectedPage:(val:number)=>void
}

function PaginatedItems({ itemsPerPage,items,setSelectedPage }:IProps) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
//   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setSelectedPage(event.selected+1)
    setItemOffset(newOffset);
  };

  if (pageCount <= 1) {
    return null; // Don't show pagination if there's only one page or no pages
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <ReactPaginate
          breakLabel={
            <span className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-violet-600 transition-colors duration-200">
              ...
            </span>
          }
          nextLabel={
            <div className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-violet-600 transition-colors duration-200 group">
              <span className="hidden sm:inline">Next</span>
              <ArrowForwardIosIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel={
            <div className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-violet-600 transition-colors duration-200 group">
              <ArrowBackIosIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="hidden sm:inline">Previous</span>
            </div>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center space-x-1"
          pageLinkClassName="flex items-center justify-center w-10 h-10 text-gray-700 font-medium rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-all duration-200 hover:scale-105"
          activeLinkClassName="!bg-gradient-to-r !from-violet-600 !to-purple-600 !text-white !shadow-lg !scale-105"
          previousClassName="mr-2"
          nextClassName="ml-2"
          disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
          breakClassName="mx-1"
        />
        
        {/* Page Info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{itemOffset + 1}</span> to{' '}
            <span className="font-medium text-gray-700">
              {Math.min(endOffset, items.length)}
            </span>{' '}
            of <span className="font-medium text-gray-700">{items.length}</span> results
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaginatedItems