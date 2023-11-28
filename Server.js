const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});



mongoose.connect('mongodb+srv://codar:ab2581998@azimhealth.b77tl66.mongodb.net/?retryWrites=true&w=majority' , {
  
  connectTimeoutMS: 300000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


app.use(cors());


const personSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: {
    type: String, 
  },
  country: String,
});


const Person = mongoose.model('Person', personSchema);


app.post('/api/person', async (req, res) => {
  try {
    const { fullName, phoneNumber, email, country } = req.body;

    
    const newPerson = new Person({
      fullName,
      phoneNumber,
      email,
      country,
    });

   
    await newPerson.save();

    res.status(201).json({ message: 'Person data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
