const { QueryTypes } = require('sequelize');

class product
{
    static async createProduct(db,obj) {
            
        const productcheck = await db.Product.sequelize.query(
            'SELECT * FROM Products WHERE name = :name',
            {
              replacements: { name: obj.name },
              type: QueryTypes.SELECT,
            }
          );
                  
        if (productcheck.length != 0) {
            return false;
        }

            console.log(obj); 
            const product = await db.Product.sequelize.query(
                'INSERT INTO Products (name, description, price_per_unit, unit, stock_quantity, image_path, createdAt, updatedAt) VALUES (:name,:description , :price_per_unit,:unit,:stock_quantity,:image_path,NOW(),NOW())',
                {
                  replacements: {
                    name: obj.name,
                    description: obj.description,
                    price_per_unit: obj.price,
                    unit:obj.unit,
                    stock_quantity:obj.stock_quantity,
                    image_path:obj.image_path

                  },
                  type: QueryTypes.INSERT
                }
              );
              
            console.log(product); 
            
            console.log(product.length);
            return product;
        
    }
    static async listProduct(db){
        const [list] = await db.Product.sequelize.query('SELECT * FROM Products');
        
        return list;    

    }

    static async deleteProduct(db,id){
        const productcheck = await db.Product.sequelize.query(
            'SELECT * FROM Products WHERE product_id = :id',
            {
              replacements: { id: id },
              type: QueryTypes.SELECT
            }
          );
          console.log(productcheck.length);
        if (productcheck.length == 0) {
            return false;
        }


        const ordercheck = await db.OrderItem.sequelize.query(
          'SELECT * FROM OrderItems WHERE product_id = :id',
          {
            replacements: { id: id },
            type: QueryTypes.SELECT
          }
        );
        console.log(productcheck.length);
      if (ordercheck.length != 0) {
        const order = await db.OrderItem.sequelize.query(
          'DELETE FROM OrderItems WHERE product_id = :id',
          {
            replacements: { id: id },
            type: QueryTypes.DELETE
          }
        );
      }

        const deleteurl=productcheck[0].image_path;
        const product = await db.Product.sequelize.query(
            'DELETE FROM Products WHERE product_id = :id',
            {
              replacements: { id: id },
              type: QueryTypes.DELETE
            }
          );
            return deleteurl;
        
        
        
    }


static async updateProduct(db, obj) {
    const productCheck = await db.Product.sequelize.query(
        'SELECT * FROM Products WHERE product_id = :id',
        {
            replacements: { id: obj.product_id },
            type: QueryTypes.SELECT,
        }
    );
    console.log(productCheck.length);
    if (productCheck.length == 0) {
        return false;
    }

    console.log(productCheck[0]);
    const deleteUrl=productCheck[0].image_path;
    console.log(deleteUrl);

    // Prepare the base query and replacements
    let query = 'UPDATE Products SET name = :name, description = :description, price_per_unit = :price_per_unit, unit = :unit, stock_quantity = :stock_quantity, updatedAt = NOW()';
    let replacements = {
        name: obj.name,
        description: obj.description,
        price_per_unit: obj.price_per_unit,
        unit: obj.unit,
        stock_quantity: obj.stock_quantity,
        product_id: obj.product_id,
    };

    // Append image_path to the query and replacements if it's provided
    if (obj.image_path) {
        query += ', image_path = :image_path';
        replacements.image_path = obj.image_path;
    }

    query += ' WHERE product_id = :product_id';

    const product = await db.Product.sequelize.query(
        query,
        {
            replacements: replacements,
            type: QueryTypes.UPDATE,
        }
    );

    if (product[1] != 0) {
        return deleteUrl;
    } else {
        return false;
    }
}


}
module.exports=product;