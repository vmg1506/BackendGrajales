const cartPersis = require('../persistence/cart')
const productPersis= require('../persistence/product')

class CartController{
    constructor(){
    }
    async listar(req,res){
        try{
            const id = req.params.id

            if( !id ) return res.json({cart: await cartPersis.getAll() })
        
            const cartProduct =  await cartPersis.get(Number(id))
        
            if( cartProduct == undefined ) return res.json({error: 'The item was not found in the cart'})
    
            return res.json({cartProduct: cartProduct})

        }catch(err){
            return res.status(500).json({error: 'an error has occured'})
        }
        
    }

    async agregar(req,res){
        try{
            const product = await productPersis.get(Number(req.params.id_producto))

            if( product == undefined || product == null ) return res.json({error: 'This product does not exist to save'})
            
            const cartProduct = await cartPersis.add(product)
    
            if(cartProduct == null || cartProduct == undefined ) res.json({error: 'an error has occured'})
    
            return res.json({producto : cartProduct})
    
        }catch(err){
            return res.status(500).json({error: 'an error has occured'})
        }
       
    }

    async borrar(req,res){
        try{
            const producto = await cartPersis.remove(Number(req.params.id))

            if(producto == undefined || producto == null ) return  res.json({error: 'no product found in cart'})
        
            return res.json({message: 'product erased', producto: producto})

        }catch(err){
            return res.status(500).json({error: 'an error has occured'})
        }
       
    }
}

module.exports = new CartController()