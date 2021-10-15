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
      console.log("test");
      return await Items.findOne({ _id: args._id });
    },

    featuredItems: async () => {

      // return await Items.find({ available: "true" });
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
      console.log(args.items);
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.items });
      console.log("line 42: ", order);
      const line_items = [];

      const { products } = await order.populate("products").execPopulate();
      console.log("line 48: ", products);
      for (let i = 0; i < products.length; i++) {
        console.log(i);
        console.log(products.length);
        console.log("for looping");
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].shortDescription,
          images: [`${url}/${products[i].image}`],
        });
        console.log("line 58: ", product);
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });
        console.log("line 61: ", price);
        line_items.push({
          price: price.id,
          quantity: 1,
        });
        console.log("line 66: " , line_items);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      //create user profile

      const user = await User.create(args);
      //assign token to user
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ $or: [{ username: email }, { email: email }] });
      //user created
      if (!user) {
        throw new AuthenticationError("Invalid Login Credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid Credentials");
      }
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    // addItemToOrder: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findbyIdAndUpdate(
    //       { _id: context.user._id },
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
          { _id: contex.user._id },
          { $pull: { orders: context.items._id } },
          { new: true }
        );
      }
    },

    toggleAvailability: async (parent, args, context) => {
      if ((context.available = true)) {
        return await Item.findOneAndUpdate(
          { _id: context._id },
          { $set: { available: false } }
        );
      }
      return await Item.findOneAndUpdate(
        { _id: context._id },
        { $set: { available: true } }
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
