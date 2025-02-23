const mongoose = require('mongoose');

main().then(() => { 
    console.log("Database has been connected successfully") 
}).catch( err => {
    console.log(err)
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new mongoose.Schema({
    item : String,
    price : Number,
});

const Order = mongoose.model("Order", orderSchema);

// const addOrders = async () => {
//     let result = await Order.insertMany([
//         {item : "Samosa" , price : 18 },
//         {item : "Chips" , price : 10 },
//         {item : "Paneer" , price : 45 },
//     ]);

//     console.log(result);
// };

// addOrders();

const customerSchema = new mongoose.Schema({
    name : String,
    orders : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Order",
        }
    ],
});

const Customer = mongoose.model("Customer" , customerSchema);

const addCustomer = async () => {
    let customer1 = new Customer({
        name : "Sakshi",
    })

    let order1 = await Order.findOne({ item : "Samosa"});
    let order2 = await Order.findOne({ item : "Chips"});
    
    customer1.orders.push(order1);
    customer1.orders.push(order2);
    
    let result = await customer1.save();
    console.log(result);
};

addCustomer();