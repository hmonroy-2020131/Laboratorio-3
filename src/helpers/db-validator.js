import User from '../users/user.model.js';
import Post from "../post/post.model.js";
import Category from "../category/category.model.js";
import Comment from "../comment/comment.model.js";

export const existenteEmail = async (email = '') =>{
    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`The email ${email} already exists in the database ⚠️`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`The ID ${id} does not exist ❌`);
    }
}


export const existingPost = async (id = '') => {
    const post = await Post.findById(id);

    if (!post) {
        throw new Error(`The post with ID ${id} does not exist 🔍❌`);
    }
};


export const existingCategory = async (id = '') => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`The category with ID ${id} does not exist 🔍❌`);
    }
};

export const existingComment = async (id = '') => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error(`The comment with ID ${id} does not exist 💬❌`);
    }
};


