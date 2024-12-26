const Post = require("../models/postModel");

const fetchPosts = async (req, res) => { 
    console.log("fetching posts")
    try {
        const posts = await Post.find().populate('userId', 'fullName photoUrl _id').sort({createdAt:-1});
        res.status(200).json({
            data: posts,
            message: "Posts fetched successfully",
        });
    } catch (error) {
        res.status(404).json({ 
            data:null,
            message: "Failed to fetch posts",
            error: error.message 
        });
    }
}  
const fetchSinglePost = async (req, res) => { 
    const id=req.params.id;
    try {
        const post = await Post.findById(id);
        res.status(200).json({
            data: post,
            message: "Posts fetched successfully",
        });
    } catch (error) {
        res.status(404).json({ 
            data:null,
            message: "Failed to fetch post",
            error: error.message 
        });
    }
}  

const createPost = async (req, res) => {
    try {
        const { description, imgUrl } = req.body;
        if(!imgUrl){
            return res.status(400).json({
                data:null,
                message: "Add image to post",
            });
        }
        const { _id } = req.user;
        const newPost = new Post({
            description,
            imgUrl,
            userId:_id,
        });
        await newPost.save();
        res.status(201).json({
            data: newPost,
            message: "Post created successfully",
        });
    } catch (error) {
        res.status(409).json({
            data:null,
            message: "Failed to create post",
            error: error.message 
        });
    }
}

const updatePost = async (req, res) => {
    
    try {
        const { description,_id } = req.body;

        const updatedPost = await Post.findOneAndUpdate({_id}, {description: req.body?.description}, { new: true });
        console.log("updated post")
        
        res.status(200).json({
            data: updatedPost,
            message: "Post updated successfully",
        });
    }
    catch(err){
        res.status(404).json({
            data:null,
            message: "Failed to update post",
            error: err.message 
        });
    }

}

const deletePost = async (req, res) => {
    const id=req.params.id;
    try {
        const deletedPost=await Post.findByIdAndDelete(id);
        res.status(200).json({
            data: deletedPost,
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            data:null,
            message: "Failed to delete post",
            error: error.message 
        });
    }
}

const fetchComments = async (req, res) => {
    const id=req.params.id;
    try {
        const post = await Post.findById(id).populate('comments.userId', 'fullName photoUrl _id')
        res.status(200).json({
            data: post.comments,
            message: "Comments fetched successfully",
        });
    } catch (error) {
        res.status(404).json({
            data:null,
            message: "Failed to fetch comments",
            error: error.message 
        });
    }
}

const createComment = async (req, res) => {
    const id=req.params.id;
    try {
        const { content } = req.body;
        if(!content){
            return res.status(400).json({
                data:null,
                message: "Write something to comment",
            });
        }
        const { _id } = req.user;
        const post = await Post.findById(id);
        post.comments.push({content, userId:_id});
        await post.save();
        res.status(201).json({
            data: post.comments,
            message: "Comment created successfully",
        });
    } catch (error) {
        res.status(404).json({
            data:null,
            message: "Failed to create comment",
            error: error.message 
        });
    }
}
module.exports = { fetchPosts, fetchSinglePost, createPost, updatePost, deletePost, fetchComments, createComment };
