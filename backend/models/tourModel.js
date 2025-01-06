import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 30
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Adventure', 'Cultural', 'Nature', 'Urban', 'Relaxation']
  },
  type: {
    type: String,
    required: true,
    enum: ['Group', 'Private', 'Self-guided']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

tourSchema.index({ location: 'text', title: 'text' });

export default mongoose.model('Tour', tourSchema);