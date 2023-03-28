import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const [products,setProducts] = useState([])
    useEffect(() =>{
        fetch('/products.json')
            .then(res=>res.json())
            .then(data=>setProducts(data))
            // console.log(products)
    },[]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        console.log(storedCart)
    },[])

    const [cart , setCart] = useState([])
    // console.log(cart)
    const handleAddToCart=(product)=>{
        console.log(product)
        const newCart =[...cart,product];
        setCart(newCart);
        addToDb(product.id)
    }
    
    return (
        <div className='shop-container'>
            <div className="product-container">
                
                {
                    products.map(product=><Product
                    key={product.id}
                    product={product}
                    handleAddToCart= {handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;