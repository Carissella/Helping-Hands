const productModel = require("../models/Product");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// upload product
exports.uploadProduct = async (req, res) => {
  const data = await productModel(req.body);
  await data.save();
  res.send({ message: "Upload successfully" });
};

// get product
exports.getProduct = async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
};

// create checkout session
exports.createCheckoutSession = async (req, res) => {
  try {
    console.log(req.body);
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};
