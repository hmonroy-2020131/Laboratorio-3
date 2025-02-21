import { response, request } from "express";
import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req = request, res = response) => {
    try {
        const { content, post } = req.body;
        const userId = req.usuario._id;
        
        const existingPost = await Post.findById(post);
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                msg: "Post not found 🔍❌",
            });
        }

        const comment = new Comment({ content, user: userId, post });
        await comment.save();

        res.status(201).json({
            success: true,
            msg: "Comment added successfully ✍️🎉",
            comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error adding comment ❌",
        });
    }
};

export const updateComment = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.usuario._id;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: "Comment not found 🔍❌"
            });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "You can only edit your own comments ✏️🚫",
            });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json({
            success: true,
            msg: "Comment updated successfully ✅",
            comment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating comment ❌",
        });
    }
};

export const deleteComment = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const userId = req.usuario._id;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: "Comment not found 🔍❌",
            });
        }

        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "You can only delete your own comments 🗑️🚫"
            });
        }

        await Comment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Comment deleted successfully 🗑️🎉"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error deleting comment ❌"
        });
    }
};

export const listCommentsByPost = async (req = request, res = response) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId }).populate("user", "username");

        res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error fetching comments ❌"
        });
    }
};
