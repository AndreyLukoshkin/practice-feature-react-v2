import React from 'react'
import { usePagination } from '../../utils/pages'

const Pagination = ({ totalPages, changePage, page }) => {
  let pagesArray = usePagination(totalPages, page)

  return (
    <div className="page__container">
      {pagesArray.map((p, i) => (
        <div
          onClick={() => changePage(p)}
          className={page === p ? 'page__current' : 'page__number'}
          key={i + 1}
        >
          {p}
        </div>
      ))}
    </div>
  )
}

export default Pagination
