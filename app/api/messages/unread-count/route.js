import connectDb from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDb();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User id is required", { status: 401 });
    }
    const { userId } = sessionUser;
    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    return new Response(JSON.stringify(count), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
