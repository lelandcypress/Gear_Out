const { AuthenticationError } = require("apollo-server-express");
const { Items, User } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate("orders");
      }

      throw new AuthenticationError("You need to log in");
    },

    getOneItem: async (parent, args, context) => {
      console.log("ARGS", args);
      console.log("ARGS DOT ID", args._id);
      return await Items.findOne({ _id: args._id });
    },
    featuredItems: async (parent, args, context) => {
      return await Items.findOne({ _id: context._id });
    },

    categorySearch: async (parent, { categoryQuery }) => {
      return await Items.find({ category: categoryQuery });
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ items: args.items });
      const line_items = [];

      const { items } = await order.populate("items").execPopulate();

      for (let i = 0; i < items.length; i++) {
        const item = await stripe.items.create({
          name: items[i].name,
          shortDescription: items[i].shortDescription,
          images: [`${url}/images/${items[i].image}`],
        });

        const price = await stripe.prices.create({
          item: item.id,
          unit_amount: items[i].price * 100,
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

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //user created
      if (!user) {
        throw new AuthenticationError("Invalid Login Credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid Login Credentials");
      }
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    addItemToOrder: async (parent, args, context) => {
      if (context.user) {
        return await User.findbyIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { orders: args } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to log in");
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
