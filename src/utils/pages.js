import { useMemo } from 'react'

export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit)
}

export const usePagination = (totalPages, page) => {
  const result = useMemo(() => {
    const paginationResult = []
    let visible = 7

    for (let i = 0; i < totalPages; i++) {
      paginationResult.push(i + 1)
    }

    if (page < 6)
      return [...paginationResult.slice(0, visible), '...', totalPages]

    if (totalPages - page < 5) {
      return [1, '...', ...paginationResult.slice(totalPages - 7, totalPages)]
    }

    if (page - 5 > 0) {
      return [
        1,
        '...',
        ...paginationResult.slice(Number(page) - 3, Number(page) + 2),
        '...',
        totalPages,
      ]
    }

    return paginationResult
  }, [totalPages, page])

  return result
}

// export const usePagination = (totalPages) => {
//   const result = useMemo(() => {
//     const paginationResult = []
//     for (let i = 0; i < totalPages; i++) {
//       paginationResult.push(i + 1)
//     }
//     console.log(paginationResult)
//     return paginationResult
//   }, [totalPages])

//   return result
// }
