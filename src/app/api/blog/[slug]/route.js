import {connectToDb} from "../../../../lib/utils";
import {Post} from "../../../../lib/models";
import {NextResponse} from "next/server";

export const GET = async (request, {params}) => {
    const {slug} = params;
    try {
        await connectToDb();
        const post = await Post.findOne({slug});
        return NextResponse.json(post);
    } catch (e) {
        console.log(e)
        throw new Error("Failed to fetch post!")
    }
}

export const DELETE = async (request, {params}) => {
    const {slug} = params;
    try {
        await connectToDb();
        const post = await Post.deleteOne({slug});
        return NextResponse.json("Post deleted");
    } catch (e) {
        console.log(e)
        throw new Error("Failed to delete post!")
    }
}