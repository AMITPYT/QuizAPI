const mongoose = require('mongoose');
const { Schema } = mongoose;

const Quiz = new Schema({

    question:{
        type: String,
        required: true
    },
    A:{
            type: String,
            required: true
        },
    B:{
            type: String,
            required: true
        },
    C:{
            type: String,
            required: true
        },
    D:{
            type: String,
            required: true
        },
    
    rightans:{
        type: String,
        required: true
    },
    startDate:{
        type: String,
        required: true,
    },
    endDate:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
     }
    
  });

  module.exports = mongoose.model('Quiz',Quiz)