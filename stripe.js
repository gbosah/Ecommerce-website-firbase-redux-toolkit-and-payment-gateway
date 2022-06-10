const stripe = require('stripe')('sk_test_51L8NIjBeAS5qFDk37UquS8PYQfGL4c4B3OceuOaHZ44p8fhm8ap3iaUijHpF7ZbEl74z74sz1BabaEMQF6qxurmU00XGnu6lwI');
const express = require('express');
const app = express();
app.use(express.static('.'));
 
const YOUR_DOMAIN = 'http://localhost:3000/checkout';

const { cartItems, total } = useSelector((state) => state.cart);

const line_items = cartItems.map((item)=> {
    return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.img],
            description: item.specification,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
      };
});
 
app.post('/create-checkout-session', async (req, res) => {
 const session = await stripe.checkout.sessions.create({
   payment_method_types: [
     'card'
   ],
   line_items,
   mode: 'payment',
   success_url: `${YOUR_DOMAIN}?success=true`,
   cancel_url: `${YOUR_DOMAIN}?canceled=true`,
 });
 
 res.redirect(303, session.url)
});
 
app.listen(5000, () => console.log('Running on port 5000'));