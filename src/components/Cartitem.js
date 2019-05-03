import React from 'react'
import {Link} from 'react-router-dom'

export default function Cartitem({product}){
    return (
        <tr>
            <td>
                <Link to={'/details/'+product.id}>
                    {product.title}
                </Link>
            </td>
            <td>
            {product.price}
            </td>
            <td>
            {product.count}
            </td>
            <td>
            {product.total}
            </td>
        </tr>
    )
}