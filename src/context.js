import React from 'react'
import {storeProducts} from './data'


const ProductContext = React.createContext()

class ProductProvider extends React.Component{
    state={
        products: storeProducts,
        cart:[],
        cartMap:{}
    }
    
    componentDidMount(){
        if(localStorage){
            let storagedCart = localStorage.getItem('cart')
            if(storagedCart !== null){
                storagedCart = JSON.parse(storagedCart)
                let map=this.constructCartMap(storagedCart)
                this.setState({
                    cart:storagedCart,
                    cartMap:map
                })
            }
        }
    }

    constructCartMap = (cart) => {
        let map={}
        cart.forEach((p)=>{
            map[p.id]=true
        })
        return map
    }

    handleAddtoCart = id =>{
        // find product array id
        let productsCopy=[...this.state.products]
        let index = productsCopy.findIndex((p)=>{
            return p.id===id
        })
        let added=productsCopy[index]
        added.inCart=true
        added.count=1
        added.total=added.price
        let map=this.constructCartMap([...this.state.cart,added])
        
        this.setState((state)=>{
            return ({
                products:productsCopy,
                cart:[...state.cart,added],
                cartMap:map})
            }, ()=>{
                if(localStorage){
                    localStorage.setItem('cart', (JSON.stringify(this.state.cart)))
                }
        })
    }

    emptyCart = () => {
        if(localStorage){
            localStorage.clear()
        }
        let tmpProducts=JSON.parse(JSON.stringify(this.state.products))
        tmpProducts = tmpProducts.map((p)=>{
            p.inCart=false
            return p
        })
        this.setState({cart:[],products:tmpProducts,cartMap:{}})
    }

    render(){
        return(
        <ProductContext.Provider value={{
            ...this.state,
            handleAddtoCart:this.handleAddtoCart,
            emptyCart:this.emptyCart
        }}>
            {this.props.children}
        </ProductContext.Provider>)
    }
}

const ProductConsumer = ProductContext.Consumer
//Provider antaa juttuja, Consumerilla otetaan niitä contextista.
export {ProductProvider, ProductConsumer, ProductContext}