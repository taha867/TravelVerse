import Tour from "../models/tourModel.js";

const GetTours = async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      categories,
      rating,
      type,
      sort,
      page = 1,
      limit = 9,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Duration range
    if (minDuration || maxDuration) {
      query.duration = {};
      if (minDuration) query.duration.$gte = Number(minDuration);
      if (maxDuration) query.duration.$lte = Number(maxDuration);
    }

    // Categories
    if (categories) {
      query.category = { $in: categories.split(",") };
    }

    // Rating
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Tour type
    if (type) {
      query.type = { $in: type.split(",") };
    }

    // Sorting
    let sortQuery = {};
    if (sort) {
      switch (sort) {
        case "price_asc":
          sortQuery = { price: 1 };
          break;
        case "price_desc":
          sortQuery = { price: -1 };
          break;
        case "rating":
          sortQuery = { rating: -1 };
          break;
        case "duration":
          sortQuery = { duration: 1 };
          break;
        default:
          sortQuery = { createdAt: -1 };
      }
    }

    const skip = (page - 1) * limit;

    const tours = await Tour.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    const total = await Tour.countDocuments(query);

    res.json({
      tours,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { GetTours };
