import { Router } from "express";
import { check } from "express-validator";
import { createComment, updateComment, deleteComment, listCommentsByPost } from "./comment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existingPost, existingComment } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("content", "Comment content is required").not().isEmpty(),
        check("post", "Invalid post ID").isMongoId(),
        check("post").custom(existingPost),
        validarCampos
    ],
    createComment
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid comment ID").isMongoId(),
        check("id").custom(existingComment),
        check("content", "Comment content is required").not().isEmpty(),
        validarCampos
    ],
    updateComment
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid comment ID").isMongoId(),
        check("id").custom(existingComment),
        validarCampos
    ],
    deleteComment
);

router.get("/post/:postId", 
    [
        check("postId", "Invalid post ID").isMongoId(),
        check("postId").custom(existingPost),
        validarCampos
    ], 
    listCommentsByPost
);

export default router;
