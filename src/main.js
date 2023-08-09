import express from 'express'
import ProductManager from './manager/ProductManager.js'
const productManager = new ProductManager('../products.txt')

const PORT = 4000
const app = express()



app.get ('/', (req, res) => {
    res.send('Welcome to the Express server of Agus! :)')
})

app.get('/products', async (req, res) => {
    try {
        const prods = await productManager.getProducts()
        res.status(200).json(prods)
    } catch {
        res.status(400).send({ message: error.message})
    }
})

app.get('/products/:id', async (req, res) => {
    try {
    const { id } = req.params
    const filtredProducts = await productManager.getProductById(Number(id))
    if (filtredProducts){
        res.status(200).json(filtredProducts)       
    } else {
        res.status(400).send('Error: Product not found')
    }
    } catch {
        res.status(404).send({message : error.message})
    }
})


app.get('/products/:category', async(req,res) => {
    try {        
    const { category } = req.params
    const prods = await productManager.getProducts()
    const catFiltred = prods.filter(prod => prod.category === category)
    if (catFiltred){
        res.status(200).json(catFiltred)
    } else {
        res.status(404).send('Error: This category does not exist')
    }
    } catch {
        res.status(404).send({message : error.message})        
    }
})

app.delete('/products', async(req, res) =>{
    try {
        await productManager.deleteAllProducts()
        res.send('Todos los productos han sido eliminados correctamente!')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


// app.get ('/users', (req, res) => {
//     res.send('Users page!')
// })



//Ruta para error 404
app.get('*', (req, res) => {
    res.send('Error 404: Page not found')
})


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!`);
})