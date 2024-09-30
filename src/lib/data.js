import {Post, User} from "./models";
import {connectToDb} from "./utils";
import {unstable_noStore as noStore} from "next/cache";

// TEMPORARY DATA
// const users = [
//     {id: 1, name: "John"},
//     {id: 2, name: "Jane"},
// ];
//
// const posts = [
//     {id: 1, title: "Post 1", body: "......", userId: 1},
//     {id: 2, title: "Post 2", body: "......", userId: 1},
//     {id: 3, title: "Post 3", body: "......", userId: 2},
//     {id: 4, title: "Post 4", body: "......", userId: 2},
// ];


export const getPosts = async () => {
    //for disable caching
    noStore();
    try {
        connectToDb();
        const posts = await Post.find();
        return posts;
    } catch (e) {
        console.log(e)
        throw new Error('failed to fetch posts!');
    }
}

export const getPost = async (slug) => {
    try {
        connectToDb();
        //Post.find({slug}) returns an array contains the object with this chosen slug
        //Post.findOne({slug}) returns the same object, but it is not wrapped inside an array
        const post = await Post.findOne({slug});
        return post;
    } catch (e) {
        console.log(e)
        throw new Error('failed to fetch post!');
    }
}

export const getUser = async (userId) => {
    try {
        connectToDb();
        const user = await User.findById(userId);
        return user;
    } catch (e) {
        console.log(e);
        throw new Error('failed to fetch user!')
    }
}

export const getUsers = async () => {
    try {
        connectToDb();
        const users = await User.find();
        return users;
    } catch (e) {
        console.log(e);
        throw new Error('failed to fetch users!');
    }
}
