import React from 'react'
import {ProductConsumer, ProductContext} from '../context'

class Details extends React.Component{

    constructor({match}){
        super()
        this.state={
            detail:'none yet'
        }
        this.id=match.params.id
    }

    getDetails = (id) =>{
        let index = this.context.products.findIndex((p)=>{
            // eslint-disable-next-line
            return p.id===Number.parseInt(id)
        })
        return this.context.products[index]
    }

    componentDidMount(){
        let d=this.getDetails(this.id)
        this.setState((s)=>{
            return {detail:d}})
    }
    render(){
        return (
            <ProductConsumer>
                {value=>{
                    return <div>
                        {JSON.stringify(this.id)}
                        <br />
                        {JSON.stringify(this.state.detail)}
                    </div>
                }}
            </ProductConsumer>
        )
    }
}
Details.contextType=ProductContext

export default Details