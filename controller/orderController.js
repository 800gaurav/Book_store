import user from "../modal/useModel.js";
import book from "../modal/books.js";
import order from "../modal/oders.js";

export const placeOrderController = async(req, res)=>{
    try {
        const {id} = req.headers;
        const {Order} = req.body;
        
        for (const orderdata of Order) {
           const neworder = new order({User: id, Book: orderdata._id});
            const orderdatafromdb = await neworder.save();
            
            
            await user.findByIdAndUpdate(id,{
                $push: {orders:orderdatafromdb._id} 
            })

           
            await user.findByIdAndUpdate(id, {
                cart: [] // Set the cart to an empty array
            });

            // if we want cart should be not empty. so we can remove upper function
        };

        res.status(201).send({
            success:true,
            message:"order place successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while place order",
            error,
          });
         
    }
};





export const getorderHistoryController = async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Find user and populate orders with books
      const userdata = await user.findById(id).populate({
        path: "orders", // Correct the typo from "oders" to "orders"
        populate: { path: "Book" } // Capitalize "Book" as per your order schema
      });
  
      if (!userdata) {
        return res.status(404).send({
          success: false,
          message: "User not found"
        });
      }
  
      const orderdata = userdata.orders.reverse(); // To reverse order history
  
      res.status(201).send({
        success: true,
        message: "Get order history successfully",
        orderdata
      });
    } catch (error) {
      console.log(error); // Log the error for debugging
      res.status(500).send({
        success: false,
        message: "Error while getting order history",
        error
      });
    }
  };

export const getallorderController = async(req, res)=>{
    try {
        const userdata = await order.find()
        .populate({
        path: "Book"
        })
        .populate({
            path: "User"
        })
        .sort({createdAt: -1});
       
        res.status(200).send({
            success:true,
            message:"all order find successfully",
            userdata
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while get all order history",
            error,
          });
    }
};

export const updataallorderController = async()=>{
try {
    const {id} = req.params
    await order.findByIdAndUpdate(id, {status: req.body.status});

    res.status(201).send({
        success:true,
        message:"update successfully"
    })
} catch (error) {
    res.status(500).send({
        success: false,
        message: "error while get all order history",
        error,
      });
}
}