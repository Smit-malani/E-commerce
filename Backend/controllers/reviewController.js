const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");

module.exports.addReview = async (req, res) => {
  try {
    const { productId } = req.params
    const { rating, comment } = req.body
    const userId = req.user

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    if (!comment?.trim()) {
      return res.status(400).json({ success: false, message: 'Review comment is required' });
    }

    const product = await productModel.findById(productId)
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = await reviewModel.create({
        rating,
        comment,
        user:userId
    })

    if(review){
        await productModel.findByIdAndUpdate(productId,{$push :{review: review._id}})
        res.status(201).json({ success: true, message: 'Review submitted successfully', review});
    }


  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
  
    const { productId } = req.body; 
    const {reviewId } = req.params;
    const review = await reviewModel.findById(reviewId);      

    if (!review) return res.status(404).json({ message: 'Review not found', success: false});

    if (review.user.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized to delete this review',  success: false});
    }

    await reviewModel.findByIdAndDelete(reviewId);

    await productModel.findByIdAndUpdate(productId, {
      $pull: { reviews: reviewId },
    })

    res.status(200).json({ message: 'Review deleted successfully',  success: true });

  } catch (err) {
    res.status(500).json({ message: 'Server error', success: false });
  }
};
