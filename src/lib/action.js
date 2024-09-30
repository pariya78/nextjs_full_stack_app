//every function that is exported will run on the server
"use server"

//server functions have to be async
//Server Actions in Next.js 14 are basically asynchronous functions that run on the server and it has some points like: safety in security , improve performance ,Simplifies code by keeping server logic within the Next.js framework.
//you can see this request in browser network tab
// Server Actions can handle data mutations, form submissions etc. They can also be used for fetching data but we next.js doesn’t recommends to use it for fetching purpose

//if you have a small application, use server actions but if you have a big project, use API ROUTES instead

import {connectToDb} from "./utils";
import {Post, User} from "./models";
import {revalidatePath} from "next/cache";
import {signIn, signOut} from "./auth";
import bcrypt from "bcryptjs";

export const login = async (prevState, formData) => {
    const {username, password} = Object.fromEntries(formData);

    try {
        await signIn("credentials", {username, password});
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return {error: "Invalid username or password"};
        }
       throw err;
    }
};

//LOGIN WITH GITHUB
export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
};

export const register = async (previousState, formData) => {
    const {username, email, password, img, passwordRepeat} =
        Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return {error: "Passwords do not match"};
    }

    try {
        connectToDb();

        const user = await User.findOne({username});

        if (user) {
            return {error: "Username already exists"};
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();
        console.log("saved to db");

        return {success: true};
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};


export const handleLogout = async () => {
    "use server";
    await signOut();
};

export const addPost = async (formData) => {
    const {title, desc, slug, userId} = Object.fromEntries(formData);
    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })
        await newPost.save();
        console.log('saved to db');
        //whenever we create a new post, it will update cache and show fresh data
        revalidatePath('/blog')
    } catch (e) {
        console.log(e)
        return {
            error: "Something went wrong!"
        }
    }
}

export const deletePost = async (formData) => {
    const {id} = Object.fromEntries(formData);

    try {
        connectToDb();
        //this will delete one blog
        await Post.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/blog");
    } catch (err) {
        console.log(err);
        return {error: "Something went wrong!"};
    }
};

