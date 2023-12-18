const stripe = require('stripe')("sk_test_51OOJrqSCctvp73iaIsaT6McKgtQYTe7UPSlZOsRBO8GDeosFAJU2QrRynHXrl46vRUsE3AyRxuDUZxkqupL2stXw00OSL0DycB")
const checkout = async (req, res) => {
    try {
        console.log("hello")
        const lineItems = req.body.map(item => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: (item.price) * 100
                },
                quantity: item.quantity
            }

        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:3001/payment/sucess",
            cancel_url: "http://localhost:3001/payment/cancel"
        })
        res.json({ id: session.id })

    } catch (error) {
        console.log(error);
    }

}


module.exports = checkout