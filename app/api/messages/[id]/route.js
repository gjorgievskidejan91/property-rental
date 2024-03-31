import connectDb from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDb();
    const { id } = params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response("User is required", { status: 401 });
    }

    const { userId } = sessionUser;
    //Find message by id
    const message = await Message.findById(id);
    //Check if exist message
    if (!message) return new Response("Message not found", { status: 404 });
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    //Update message to read/unread depending on the current status
    message.read = !message.read;
    //Save updated message
    message.save();
    return new Response(JSON.stringify(message), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
//DELEte /api/messages/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDb();
    const { id } = params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response("User is required", { status: 401 });
    }

    const { userId } = sessionUser;
    //Find message by id
    const message = await Message.findById(id);
    //Check if exist message
    if (!message) return new Response("Message not found", { status: 404 });
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //delete message
    await message.deleteOne();

    return new Response("Message deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
