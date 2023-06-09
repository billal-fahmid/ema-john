import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products,setProducts] = useState([])
    const [cart , setCart] = useState([])

    useEffect(() =>{
        fetch('/products.json')
            .then(res=>res.json())
            .then(data=>setProducts(data))
            // console.log(products)
    },[]);

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart()
    }
    

    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
 
        //step 1 get id
        for(const id in storedCart){
            // step 2 get product by using the id
            const addedProduct = products.find(product =>product.id === id )
            // step 3 get the quantity of the product 
           if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity
            // console.log(addedProduct,quantity)
            // step 4 add the addedProduct to the saveCart
            saveCart.push(addedProduct);
           }
           
        }
        // step 5 set the cart 
        setCart(saveCart)
    },[products])

    
    // console.log(cart)
    const handleAddToCart=(product)=>{
        // console.log(product)
        let newCart =[];
        // const newCart =[...cart,product];
        // if product doesn't exits in the cart , then set quantity = 1 ;
        // if exist the update quantity by 1
        const exists = cart.find(pd=> pd.id=== product.id);
        if(!exists){
            product.quantity =1;
            newCart=[...cart,product]
        }else{
            exists.quantity=exists.quantity +1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }


        setCart(newCart);
        addToDb(product.id)
    }
    const obj = {name :'jack',age:27}
    const a= 'name' in obj;
    console.log(a)
    
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
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;