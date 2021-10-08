const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');





checkout: async (parent, args, context) => {
    const url = new URL(context.headers.referer).origin;
    const order = new Order({ items: args.items });
    const line_items = [];

    const { items } = await order.populate('items').execPopulate();

    for (let i = 0; i < items.length; i++) {
      const item = await stripe.items.create({
        name: items[i].name,
        shortDescription: items[i].shortDescription,
        images: [`${url}/images/${items[i].image}`]
      });

      const price = await stripe.prices.create({
        item: item.id,
        unit_amount: items[i].price * 100,
        currency: 'usd',
      });

      line_items.push({
        price: price.id,
        quantity: 1
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/`
    });

    return { session: session.id };
  }


















module.exports = resolvers;
