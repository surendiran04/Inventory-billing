const { QueryTypes } = require('sequelize');

class Order
{
    static async createOrder(db,obj) {
                
        
            console.log(obj); 
            console.log(obj);
            const order = await db.Order.sequelize.query(
                'INSERT INTO Orders (customer_id, createdAt, updatedAt) VALUES (:customer_id,NOW(),NOW())',
                {
                  replacements: {
                    customer_id: obj.customer_id,
                    

                  },
                  type: QueryTypes.INSERT
                }
              );

              const orderIdQuery = await db.Order.sequelize.query('SELECT LAST_INSERT_ID() AS orderId', {
                type: QueryTypes.SELECT,
              });
            const orderId=orderIdQuery[0].orderId;  
            console.log(orderIdQuery[0].orderId);
            await db.OrderItem.sequelize.query(
              'INSERT INTO Orderitems (order_id,product_id, quantity,createdAt, updatedAt) VALUES (:order_id,:product_id,:quantity,NOW(),NOW())',
              {
                replacements: {
                  order_id:orderId,
                  product_id: obj.product_id,
                  quantity: obj.quantity
                  

                },
                type: QueryTypes.INSERT
              }
            );
          

            
            return orderId;
        
    }


    static async addToCart(db,obj) {
                
        
      console.log(obj); 
      
      await db.OrderItem.sequelize.query(
        'INSERT INTO Orderitems (order_id,product_id, quantity,createdAt, updatedAt) VALUES (:order_id,:product_id,:quantity,NOW(),NOW())',
        {
          replacements: {
            order_id:obj.cartId,
            product_id: obj.product_id,
            quantity: obj.quantity,
            
            

          },
          type: QueryTypes.INSERT
        }
      );
    
    
      
      return true;
  
}




    static async updateOrder(db,obj) {
      const ordercheck = await db.Order.sequelize.query(
          'SELECT * FROM orders WHERE order_id = :id',
          {
            replacements: { id: obj.order_id },
            type: QueryTypes.SELECT,
          }
        );
        console.log(ordercheck.length);
      if (ordercheck.length == 0) {
          return false;
      }
          console.log(obj); 
          const order = await db.Order.sequelize.query(
              'UPDATE orders SET Payment_status = :status,updatedAt=NOW() WHERE order_id = :order_id',
              {
                replacements: {
                  status: obj.status,
                  order_id:obj.order_id

                },
                type: QueryTypes.UPDATE
              }
            );
          if(order.length !=0){
              return true;
          }
          else{
              return false;
          }
                  
  }

  static async listOrder(db,customer_id){
    const list = await db.Order.sequelize.query(' select * from orders join orderstatuses on orders.order_id=orderstatuses.order_id join customers on orders.customer_id =:id',
    {
      replacements: {
        id: customer_id,     
  
      },
      type: QueryTypes.SELECT
    }
   
    );
    if (list.length == 0) {
      return false;
  }
    return list; 
}


static async adminOrder(db){
  const list = await db.Order.sequelize.query('SELECT * FROM Orders JOIN orderstatuses ON Orders.order_id = orderstatuses.order_id WHERE payment_status = "paid";',
  {
    type: QueryTypes.SELECT
  }
 
  );
  console.log(list);
  if (list.length == 0) {
    return false;
}
  return list; 
``}



static async listOrderItem(db,orderid){
  const list = await db.OrderItem.sequelize.query(' select p.name, p.price_per_unit, o.quantity , p.unit from products p join orderitems o on o.product_id = p.product_id and o.order_id=:id;',
  {
    replacements: {
      id: orderid,     

    },
    type: QueryTypes.SELECT
  }
  );
  if (list.length == 0) {
    return false;
}
  return list; 
}


static async CartList(db,customer_id){
  const list = await db.Order.sequelize.query('SELECT * FROM Orders where payment_status !="paid" AND customer_id = :id',
  {
    replacements: {
      id: customer_id     

    },
    type: QueryTypes.SELECT
  }
  );
  if (list.length == 0) {
    return false;
}
  return list; 
}

static async CartIdList(db,customer_id){
  const list = await db.Order.sequelize.query('SELECT order_id FROM Orders where payment_status !="paid" AND customer_id = :id',
  {
    replacements: {
      id: customer_id     

    },
    type: QueryTypes.SELECT
  }
  );
  if (list.length == 0) {
    return false;
}
  return list; 
}

static async deleteCart(db,id){
  await db.OrderItem.sequelize.query('DELETE FROM Orderitems where order_id=:order_id',
  {
    replacements: {order_id: id},
    type: QueryTypes.DELETE
  }
  );
  await db.Order.sequelize.query('DELETE FROM Orders where payment_status !="paid" and order_id=:order_id',
  {
    replacements: {
      
      order_id: id     

    },
    type: QueryTypes.DELETE
  }
  );
 
  return true; 
}



static async updateStat(db,obj) {
  
      console.log(obj); 
      const order = await db.OrderStatus.sequelize.query(
          'UPDATE orderstatuses SET status_name = :status,updatedAt=NOW() WHERE order_id = :order_id',
          {
            replacements: {
              status: obj.status_name,
              order_id:obj.order_id

            },
            type: QueryTypes.UPDATE
          }
        );
      if(order.length !=0){
          return true;
      }
      else{
          return false;
      }
              
}



}


module.exports=Order;