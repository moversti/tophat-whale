import React from 'react'
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'

export default function Product(props){
    const iidee = props.product.id
    return (
            <div className='col-lg-3 col-md-4 col-sm-6 my-2'>
                <div className='card mx-2 h-100'>
                    <Link to={'/details/'+iidee}><img src={props.product.img} className="card-img-top mt-2" alt={props.product.title}></img></Link>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title mt-auto">{props.product.title}</h5>
                        <p className="card-text">{props.product.price}EUR</p>
                        <ProductConsumer>
                            {value => {
                                return (
                                    <button 
                                    disabled={props.product.inCart}
                                    className='btn btn-primary' onClick={()=>{value.handleAddtoCart(iidee)}}>
                                    {props.product.inCart?'Korissa':'Lisää koriin'}
                                    </button>
                                )
                            }}
                        </ProductConsumer>
                    </div>
                </div>
            </div>
    )
}