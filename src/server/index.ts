import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "../db/sequelize";
import { Product } from "../db/product";
import { User } from "../db/user";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/users", (req, res) => {
  if (!req.body.name || !req.body.ci) { 
    return res.status(400).json({error: "Informacion faltante."})
  }
  const { name, ci, girlfriend } = req.body;
  const newUser = new User({
    name,
    ci,
    girlfriend: girlfriend || null
  });
  newUser.save().then(() => {
    return res.json({
      message: "Usuario creado correctamente.",
      id: newUser.id
    });
  }).catch(() => {
    return res.status(500).json({ error: "No se pudo crear el usuario." })
  });
});

app.post("/products/:userId",async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        ci: req.params.userId
      }
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." })
    }
    const { title, price, description } = req.body;
    if (!title || !price) { 
      return res.status(400).json({error:"Informacion faltante."})
    }
    const newProduct = new Product({
      title,
      price,
      description: description || null
    });
    await newProduct.save();
    res.json({ message: "Producto creado exitosamente", id: newProduct.id });
  } catch (err) {     
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

app.get("/products",(req, res) => {
  Product.findAll()
    .then((allProducts) => {
      return res.json(allProducts);
    })
    .catch((err) => {
      return res.status(500).json({ error: "Error interno al servidor" });
    });
});

app.get("/products/:productId", (req, res) => {
  const { productId } = req.params; 
  if (!productId) { 
    return res.status(400).json({ error: "Informacion faltante." });
  }
  Product.findOne({
    where: {
      id:productId
    }
  })
    .then((product) => { 
      if (!product) { 
        return res.status(404).json({error:"Producto no encontrado."})
      }
      return res.json(product);
    })
    .catch((err) => { 
      res.status(500).json({error:"Error interno al servidor"})
    })
});

app.patch("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const update = req.body;
  if (!productId) { 
    return res.status(400).json({error: "Id del producto faltante"})
  }
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    await product.update(update);
    return res.json({ message: "Producto actualizado", product });
  
  } catch (err) {
    return res.status(500).json({ error: "Error interno al servidor." })
  }
  
});

app.delete("/products/:idProduct" ,async (req, res) => { 
  const { idProduct } = req.params;
  const { idUsuario } = req.body;

  if (!idProduct || !idUsuario) { 
    return res.status(400).json({ error: "Informacion faltante." });
  }

  try {
    const product = await Product.findByPk(idProduct);
    if (!product) {
      return res.status(404).json({ error: "Porduct not found" });
    }

    await product.destroy();
    return res.json({ message: "Producto eliminado." });
  } catch (err) { 
    return res.status(500).json({error:"Error interno al servidor."})
  }
})

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

startServer();