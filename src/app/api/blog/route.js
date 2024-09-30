//name of this file should be route.js so next.js will understand that we are writing api route

import {connectToDb} from "../../../lib/utils";
import {Post} from "../../../lib/models";
import {NextResponse} from "next/server";

export const GET = async (request) => {
    try {
        connectToDb();
        const posts = await Post.find();
        return NextResponse.json(posts);

    } catch (e) {
        console.log(e)
        throw new Error("Failed to fetch posts!")
    }
}