import connectDb from "@/config/database";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async (request) => {
  try {
    await connectDb();

    const { userId } = await getSessionUser();

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort "read" messages by date in descending order
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort unread messages by date in descending order
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages]; // Combine unread and read messages

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

//POST /api/messages
export const POST = async (request) => {
  try {
    await connectDb();

    const { email, phone, message, property, recipient, name } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User id is required", { status: 401 });
    }

    const { user } = sessionUser;
    // can not send message to self
    if (user.id === recipient) {
      return new ResponseCache("Can not send message to yourself", {
        status: 400,
      });
    }
    //Create a new message
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message send" }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
