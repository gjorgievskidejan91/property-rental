// Importing necessary modules and functions
import connectDB from "@/config/database"; // Function to connect to the database
import Property from "@/models/Property"; // Property model

// GET /api/properties/user/[userId] endpoint handler
export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectDB();

    // Extract userId from params
    const userId = params.userId;

    // Check if userId is provided
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    // Find properties owned by the user
    const properties = await Property.find({ owner: userId });

    // Return properties as JSON response
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    // Log and return a 500 response in case of any error
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
