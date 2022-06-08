import Order from "../../../models/Order";
import dbConnect from "../../../utilitis/mongo";

export default async function handler(req, res) {
  const { method, cookies } = req;

  //   const token = cookies.token;

  //   dbConnect function from mongo.js
  dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if (!token || token !== process.env.token) {
    //   return res.status(401).json("Not authenticated!");
    // }

    try {
      //   const newOrders = Order(req.body);
      //   const orders = await newOrders.save();
      const orders = await Order.create(req.body); // create diye post kora jay
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
