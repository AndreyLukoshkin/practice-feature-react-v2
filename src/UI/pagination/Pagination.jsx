import React, { useState } from 'react'
import { usePagination } from '../../hooks/usePagination'

const Pagination = ({ totalPages, changePage, page, setPage }) => {
  let pagesArray = usePagination(totalPages, page)

  const [value, setValue] = useState('')

  const goToPage = (page) => {
    if (page > totalPages) {
      setValue('')
      return setPage(totalPages)
    }
    setValue('')
    setPage(page)
  }

  return (
    <div className="page__container">
      {pagesArray.map((p, i) => (
        <div
          onClick={() => changePage(p)}
          className={Number(page) === p ? 'page__current' : 'page__number'}
          key={i + 1}
        >
          {p}
        </div>
      ))}
      <input
        className="inputPages"
        type="number"
        placeholder="Page №"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btnPages" onClick={() => goToPage(value)}>
        Go!
      </button>
    </div>
  )
}

export default Pagination
