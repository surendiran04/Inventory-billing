const express = require('express');
const router = express.Router();
const db= require('../models/db');
const product=require('../controller/product');
router.use(express.json())
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename files with current timestamp
  },
});

const upload = multer({ storage: storage });

router.post('/create-product', upload.single('image'), async (req, res) => {
  
  try {
    console.log(req.file);
    console.log(req.body);
    const imagePath = req.file ? 'uploads/' + req.file.filename : null;
    req.body.image_path = imagePath;   
  
    result= await product.createProduct(db,req.body);
    console.log('res',result);
    if (result) {
        res.status(200).json({ "message": "Successfully inserted" });
    } else {
        res.status(403).json({ "error": "Product exist already" });
    }
} 
catch (error) {
    
    console.error('Error creating product : ', error);
    res.status(500).json({ "error": "Internal server error " });
}

});


// Route to get all products
router.post('/list', async (req, res) => {
    try {
       const result= await product.listProduct(db);
       
        
        if (!result) {
            res.status(403).json({ "error": "Product not exist" });
        } else {
            res.status(200).json(result);                   }
        
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({" error": 'Failed to fetch products' });
    }
});


router.put('/:id', upload.single('image'), async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      console.log(req.body);
      console.log(req.file);
  
      // If an image file is uploaded, set the image path, otherwise retain the existing one
      if (req.file != null) {
        req.body.image_path = 'uploads/' + req.file.filename;
        console.log(req.body.image_path);
      } else {
        req.body.image_path = null; // Ensure the image path is not updated if no new image is provided
      }
  
      req.body.product_id = productId;
      const result = await product.updateProduct(db, req.body);
      if (!result) {
        res.status(403).json({ message: 'Product not exists' });
        
      } else {
        fs.unlink(result, (err) => {
            if (err) {
              console.error('Error deleting image file:', err);
            } else {
              console.log('Image file deleted successfully');
            }

        });
        

        res.status(200).json({ message: 'Successfully updated' });
      }
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  router.delete('/:id', async (req, res) => {
    try{
    result= await product.deleteProduct(db,parseInt(req.params.id));
    
        if (!result) {
            res.status(403).json({ "error": "product not exist" });
            } else {

                fs.unlink(result, (err) => {
                    if (err) {
                      console.error('Error deleting image file:', err);
                    } else {
                      console.log('Image file deleted successfully');
                    }
    
                });
                res.status(200).json({ message: 'Row deleted successfully' });
            
            
        }
    } catch (error) {
        console.error('server error:', error);
        res.status(500).json({ "error": 'internal server error' });
    }
  });




module.exports = router
