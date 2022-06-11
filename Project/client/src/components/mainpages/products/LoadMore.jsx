import React, { useContext } from 'react'
import { ProductContext } from '../../../contexts/ProductContext'




const LoadMore = () => {
    const { productState: { filters }, setFilters
    } = useContext(ProductContext)


    return (
        <div className="load_more">
            {
                filters.result < filters.page * 12 ? '' :
                    (
                        <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>
                            Load More
                        </button>
                    )
            }
        </div>
    )
}

export default LoadMore