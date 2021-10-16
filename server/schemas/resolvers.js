const { AuthenticationError } = require("apollo-server-express");
const { Items, User } = require("../models");
const Order = require('../models/Order');

const { signToken } = require("../utils/auth");
// const stripe = require("stripe")(process.env.STRIPE_KEY);
// Use this below if one above does not work
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate("orders");
      }
      throw new AuthenticationError("You need to log in");
    },

    getOneItem: async (parent, args, context) => {
      return await Items.findOne({ _id: args._id });
    },

    featuredItems: async () => {
      return await Items.aggregate([{
        $sample: {
          size: 6,
        },
      }]);
    },

    categorySearch: async (parent, { categoryQuery }) => {
      return await Items.find({ category: categoryQuery });
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.items });
      console.log("line 39 :", order.id);
      const line_items = [];

      const { products } = await order.populate("products").execPopulate();
      await Order.create(order);

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].shortDescription,
          images: [`${url}/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success/${order.id}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    getOrder: async (parent, args, context) => {
      console.log(args);
      if (args._id) {
        return Order.findOne({ _id: args._id});
      }

      throw new AuthenticationError("Wrong Order#");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ $or: [{ username: email }, { email: email }] });
      if (!user) {
        throw new AuthenticationError("Invalid Login Credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid Credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    // addOrder: async (parent, args, context) => {
    //   console.log("line 98: ", args);
    //   // console.log( "line 99: ", context.user);
    //   if (args._id) {
    //     return await User.findOneAndUpdate(
    //       { _id: args._id },
    //       { $addToSet: { orders: args } },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You need to log in");
    // },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    returnItem: async (parent, args, context) => {
      if (context.user) {
        return await User.findbyIdAndUpdate(
          { _id: context.user._id },
          { $pull: { orders: context.items._id } },
          { new: true }
        );
      }
    },

    toggleAvailability: async (parent, { _id }, context) => {
      const { available } = await Items.findById(_id);
      const toggle = !available;
      return await Items.findOneAndUpdate(
        { _id },
        { $set: { available: toggle } }
      );
    },

    createItemRating: async (parent, args, context) => {
      if (context.items) {
        return await Items.findbyIdAndUpdate(
          { _id: context.items._id },
          { $addToSet: { rating: args } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
