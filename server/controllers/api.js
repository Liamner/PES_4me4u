import Product from "../models/product.js";

export const readAllProducts = async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
    
    console.log(product);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

export const readProduct = async (req, res) => {
  try {
    const product = await Product.findById({_id: req.params.id});

    console.log('Reading product: ' + req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}

export const readProductsFiltered = async (req, res) => {
  try {
    const product = await Product.find({filter: req.params.filter});
    console.log('Reading products with filter: ' + req.paramas.filter);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
    console.log(error.message);
  }
}

export const createProduct = async (req, res) => {
  //const product = new Product();
  // REVISAR CODIGOS ERROR SI FALTA ALGUN CAMPO OBLIGATORIO
  const { name, categories, description, publishingDate, exchange, img, state, owner } = req.body;
  const product = new Product();
  product.name = name;
  product.categories = categories;
  if (description != null) product.description = description;
  if (publishingDate != null) product.publishingDate = publishingDate;
  product.exchange = exchange;  
  if (img != null) product.img = img;
  product.state = state;
  product.owner = owner;

  console.log(product);

  try {
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json(error.message);
    
    console.log('Can not create the Product');
  }
}

export const updateProduct = async (req, res) => {

}

export const deleteProduct = async (req, res) => {

    try {
      const product = await Product.findByIdAndDelete({_id: req.params.id});
  
      console.log('Reading product: ' + req.params.id);
  
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json(error.message);
      console.log(error.message);
    }
  }