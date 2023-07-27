const { Product } = require("../models")

exports.createProduct = async(req, res)=>{
    const userId = req.user.id
    const body = req.body
    const product = await Product.create({...req.body, userId})

    res.json({
        success: true,
        message: "Product listed"
    })
}

exports.updateProduct = async (req, res)=>{
    const body = req.body;  
    const userId = req.user.id

    const existingProduct =  await Product.findOne({  where: { id: body.id }})

    if(!existingProduct){
        res.json({
            status: true,
            message: "Product doesnot exist."
        })
    }else{

        if( userId == existingProduct || req.user.roles == 'ADMIN'){
            existingProduct.name = body.name
            existingProduct.code = body.code
            existingProduct.quantity = body.quantity
            await existingProduct.save()
    
            res.json({
                status: true,
                message: 'Updated'
            })
        }else{
          res.json({
            status: false,
            message: "You don't have permission to update this product",
          });
        }
    }
}

exports.deleteProduct = async (req, res)=>{
    const {id} = req.body
    const existingProduct = await Product.findOne({where: {id}})

    if(!existingProduct){
        res.json({
            success: false,
            message: "Product doesnot exist"
        })
    }else{
        await existingProduct.destroy()
        res.json({
            success: true,
            message: "Product deleted"
        })
    }
}

exports.getAllProduct = async (req, res) =>{
    const product = await Product.findAll();

    if(!product){
      res.json({
        status: false,
        message: "Product not found.",
      });
    }else{
        res.json({
            success: true,
            product
        })
    }
}


exports.getSingleProduct = async(req, res)=>{
    const {id} = req.query
    const product = await Product.findOne({ where: { id }});

    if(!product){
      res.json({
        status: false,
        message: "Product not found.",
      });
    }else{
        res.json({
            success: true,
            product
        })
    }
}