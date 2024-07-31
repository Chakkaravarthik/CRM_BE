import mongoose from 'mongoose'

// schema creation for login user

const userschema = new mongoose.Schema({
    id:{
        type:"String",
        required:true,
    },
    name:{
        type:"String",
        required:true,
    },
    email:{
        type:"String",
        required:true,
    },
    password:{
        type:"String",
        required:true,
    },
})

const usermodel = new mongoose.model('user', userschema , 'users');

// schema amd model for customers 

const customerSchema = new mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    phone: "String",
    address: {
      street: "String",
      city: "String",
      state: "String",
      postal_code: "String",
      country: "String"
    },
    textile_preferences: {
      fabrics: ["String"],
      colors: ["String"],
      designs: ["String"]
    },
    purchase_history: [
      {
        purchase_id: "String",
        date: "Date",
        items: [
          {
            item_id: "String",
            name: "String",
            quantity: "Number",
            price: "Number"
          }
        ],
        total_amount: "Number",
        payment_method: "String"
      }
    ],
    contact_preferences: {
      email: "Boolean",
      sms: "Boolean",
      mail: "Boolean"
    },
    communications: [
      {
        type: { type: "String", enum: ['email', 'meeting'] },
        date: "Date",
        description: "String"
      }
    ],
    feedbacks: [
      {
        date: "Date",
        feedback: "String"
      }
    ],
    offers: [
      {
        offer_id: "String",
        description: "String",
        expiration_date: "Date"
      }
    ]
  });
  
  const CustomerModel = new mongoose.model('Customer', customerSchema, 'Customers');

export{ usermodel, CustomerModel}