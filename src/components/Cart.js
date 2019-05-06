import React from 'react'
import Cartitem from './Cartitem'
import {ProductConsumer} from '../context'

export default function Cart(){
    return (
        <div>
            <ProductConsumer>
                {value=>{
                    return value.cart.length>0 ? <table className='table'><thead><th>Tuote</th><th>Hinta</th><th>Määrä</th><th>Yhteensä</th></thead>
                    <tbody>

                    {value.cart.map((p)=>{
                        return <Cartitem product={p} />
                    })}

                    </tbody>
                    </table> : null
                }}
            </ProductConsumer>
            <ProductConsumer>
                {value=>{
                    return value.cart.length>0 ? <div><button className='btn btn-info mr-5 ml-3 px-4 float-right'>Osta</button><h5 className='float-right'>Yhteensä {value.cartTotal()} EUR</h5></div> : null
                }}
            </ProductConsumer>
            <ProductConsumer>
                {value=>{
                    return value.cart.length>0 ? <button className="btn btn-danger mx-5 mt-5" onClick={value.emptyCart}>Tyhjennä ostoskori</button> : <h3>Ostoskori tyhjä</h3>
                }}
            </ProductConsumer>
        </div>
    )
}