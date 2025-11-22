import connectDb from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDb();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Userd Id is required");
    }
    const { userId } = sessionUser;
    //find the user by their session id
    const user = await User.findById(userId);
    //check if the property is alredy bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;
    if (isBookmarked) {
      //If alredy bookmarked remove it from bookmarks
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    await connectDb();
    const { userId } = await getSessionUser();

    //find the usetr by their session
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    //retrive the users bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
