import connectDb from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDb();

    const properties = await Property.find({
      isFeatured: true,
    });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong world", { status: 500 });
  }
};
