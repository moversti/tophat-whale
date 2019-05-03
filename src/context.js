import React from 'react'
import {storeProducts} from './data'


const ProductContext = React.createContext()

class ProductProvider extends React.Component{
    state={
        products: storeProducts,
        cart:[]
    }
    
    componentDidMount(){
        if(localStorage){
            let storagedCart = localStorage.getItem('cart')
            if(storagedCart !== null){
                storagedCart = JSON.parse(storagedCart)
                this.setState({cart:storagedCart})
            }
        }
    }

    handleAddtoCart = id =>{
        // find product array id
        let productsCopy=[...this.state.products]
        let index = productsCopy.findIndex((p)=>{
            return p.id===id
        })
        let added=productsCopy[index]
        added.inCart=true

        
        
        this.setState((state)=>{
            return ({
                products:productsCopy,
                cart:[...state.cart,added]})
            }, ()=>{
                if(localStorage){
                    localStorage.setItem('cart', (JSON.stringify(this.state.cart)))
                }
        })

    }
    render(){
        return(
        <ProductContext.Provider value={{
            ...this.state,
            handleAddtoCart:this.handleAddtoCart
        }}>
            {this.props.children}
        </ProductContext.Provider>)
    }
}

const ProductConsumer = ProductContext.Consumer
//Provider antaa juttuja, Consumerilla otetaan niitä contextista.
export {ProductProvider, ProductConsumer, ProductContext}