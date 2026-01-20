const database = async () => {
    try {
  const products = await mongoose.connection.db
    .collection("Bunkbazaar")
    .find({})
    .toArray();
  res.json(products);
} catch (error) {
  res.status(500).json({ message: "Error fetching products", error });
}
};

exports.module = database;


