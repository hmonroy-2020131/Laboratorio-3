'use strict';
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticion.js';
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/users/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import postRoutes from '../src/post/post.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
 
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes =(app) => {
    app.use("/Laboratorio3/v1/auth", authRoutes);
    app.use("/Laboratorio3/v1/users", userRoutes)
    app.use("/Laboratorio3/v1/post", postRoutes)
    app.use("/Laboratorio3/v1/category", categoryRoutes)
    app.use("/Laboratorio3/v1/comment", commentRoutes)
}
 
 
const conectarDB = async () => {
    try{
        await dbConnection();
        console.log("Conexion a la base de datos exitosa ✅");
    }catch(error){
        console.error('Error Conectando a la base de datos ❌', error);
        process.exit(1);
    }  
}
 
export const initServer = async () =>{
    const app = express();
    const port = process.env.PORT || 3001;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port: ${port} 🚀`);
    } catch (err) {
        console.log(`Server init failed: ${err} ⚠️`);
    }
 
    
}