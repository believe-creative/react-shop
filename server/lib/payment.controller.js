
const stripe = require('stripe')("sk_test_rxGG6bAyvVn3goQP3AimI5dz");

exports.payment = (req, response) => {
    console.log(req.body);
    charge = {
        amount: 100 * 100,
        currency: "gbp",
        card: req.body.stripeToken
  };
    stripe.charges.create(charge, (err, res) => {
        if (err) response.json({status:err});
        else{
            response.json({status:"ok",id:res.id})
        }
    });
}
