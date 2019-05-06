import React from 'react'
import {Link} from 'react-router-dom'
import {ProductConsumer} from '../context'

export default function Cartitem({product}){
    return (
        <tr>
            <td>
                <Link to={'/details/'+product.id}>
                    {product.title}
                </Link>
            </td>
            <td>
            {product.price} EUR
            </td>
            <td>
                <ProductConsumer>
                    {value=>{
                        return(
                        <React.Fragment>
                            <button className='btn btn-danger' disabled={product.count<1 ? 'true' : false} onClick={()=>{value.minusOne(product.id)}}>-</button>
                            <button disabled className='btn mx-2 border border-dark'>{product.count}</button>
                            <button className='btn btn-success' onClick={()=>{value.plusOne(product.id)}}>+</button>
                        </React.Fragment>)
                    }}
                </ProductConsumer>
            </td>
            <td>
            {product.total} EUR
            </td>
        </tr>
    )
}