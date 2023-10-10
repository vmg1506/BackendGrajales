const productPersis = require('../persistence/product')


class ProductController{
    constructor(){

    }

    async listar(req,res){
        try{
            const id = req.params.id
           
            if(id){
                const product = await productPersis.get(Number(id))
                if(product == undefined) return  res.status(404).json({error: 'No se encontro el product'})
                return res.json({product: product})
            }
            const productos = await productPersis.getAll()
            return res.json({productos : productos })
    
        }catch(err){
            return res.json.status(500)({error: 'Ha ocurrido un error'})
        }
    }

    async agregar(req,res){
        const data = req.body
        res.json({ product: await productPersis.create(data)})
    }

    async actualizar(req,res){
        try {
            const data = req.body
            const product = await productPersis.update(Number(req.params.id),data)
            if( product == undefined || product == null ){
                return res.status(404).json({error: 'product not found'})
            } 
            
            return res.json({product: product})
        }catch(err){
            return res.json.status(500)({error: 'an error has occured'})
        }
    }
    async borrar (req,res){
        try{
            const product = await productPersis.remove(Number(req.params.id))
    
            if( product == undefined || product == null ) return  res.status(404).json({error: 'product not found'})
    
            return  res.json({product: product })
        }catch(err){
            console.log(err)
            return res.status(500).json({error: 'an error has occured'})
        }
        
    }
}

module.exports = new ProductController()