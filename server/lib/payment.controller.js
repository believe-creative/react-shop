
const stripe = require('stripe')("sk_test_rxGG6bAyvVn3goQP3AimI5dz");

exports.payment = (req, response) => {
    let amount=req.body.amount
    stripe.customers.create({
        email: req.body.email,
        card: req.body.id
      })
      .then(customer =>
        stripe.charges.create({
          amount,
          description: "Sample Charge",
          currency: req.body.curreny,
          customer: customer.id
        }))
      .then(charge => {
        sequelize
        .query('CALL shopping_cart_create_order(:inCartId,:inCustomerId,:inShippingId,:inTaxId)',
        {replacements:{inCartId:inCartId,inCustomerId:inCustomerId,inShippingId:inShippingId,inTaxId:inTaxId}}).then(
          create_order=>res.json(create_order));
            res.send(charge);
      })
      .catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      });
    
    stripe.charges.create(charge, (err, res) => {
        if (err) response.json({status:err});
        else{
            response.json({status:"ok",id:res.id})
        }
    });
}
