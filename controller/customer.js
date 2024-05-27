const { QueryTypes } = require('sequelize');

class customer
{
    static async createCustomer(db,obj) {
        const customercheck = await db.Customer.findAll({ where: { customer_id:obj.email } });
                
        if (customercheck.length != 0) {
            return false;
        }
            console.log(obj); 
            const c = await db.Customer.sequelize.query(
              'INSERT INTO Customers (customer_id, username, password,createdAt, updatedAt) VALUES (:email,:name,:pass,NOW(),NOW())',
              {
                replacements: {
                  name: obj.name,
                  email: obj.email,
                  pass:obj.password

                },
                type: QueryTypes.INSERT
              }
            );
            console.log(c); 
            
            return true;
        
    }

    static async login(db,obj) {
        console.log(obj);      
                      
              const user = await db.Customer.findAll({ where: { customer_id:obj.username } });
              console.log(user.length)
              if (!user.length) {
                
                return false;
              }
          
              console.log(user[0].dataValues.password, obj.password, user[0].dataValues.username, obj.username);
              if (user[0].dataValues.password=== obj.password) {
                
                console.log(user[0].dataValues.password, obj.password);
                return true;
              } else {
                return false
                
              }
            
        
    }

}
module.exports=customer;