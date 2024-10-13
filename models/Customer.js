// /models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  interest: {
    type: String,
    trim: true,
  },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
