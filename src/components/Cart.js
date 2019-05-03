import React from 'react'
import Cartitem from './Cartitem'
import {ProductConsumer} from '../context'

export default function Cart(){
    return (
        <div>
            <ProductConsumer>
                {value=>{
                    return value.cart.map((p)=>{
                        return <Cartitem product={p} />
                    })
                }}
            </ProductConsumer>
        </div>
    )
}