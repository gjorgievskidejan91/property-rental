// Importing necessary modules and functions
import connectDb from "@/config/database"; // Function to connect to the database
import Property from "@/models/Property"; // Property model
import { getSessionUser } from "@/utils/getSessionUser"; // Function to get session user

// GET /api/properties/:id endpoint handler
export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectDb();

    // Find property by id
    const property = await Property.findById(params.id);

    // If property not found, return 404 response
    if (!property) return new Response("Property not found", { status: 404 });

    // Return property details as JSON response
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    // Log and return a 500 response in case of any error
    console.log(error);
    return new Response("Something went wrong world", { status: 500 });
  }
};

// DELETE /api/properties/:id endpoint handler
export const DELETE = async (request, { params }) => {
  try {
    // Connect to the database
    await connectDb();

    // Extract property id from params
    const propertyId = params.id;

    // Get session user
    const sessionUser = await getSessionUser();

    // Check for session user and user id
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User id is required", { status: 401 });
    }

    // Extract userId from sessionUser
    const { userId } = sessionUser;

    // Find the property by id
    const property = await Property.findById(propertyId);

    // If property not found, return response
    if (!property) return new Response("Property not found");

    // Verify ownership of the property
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Delete the property
    await property.deleteOne();

    // Return success response
    return new Response("Property deleted", { status: 200 });
  } catch (error) {
    // Return a 500 response in case of any error
    return new Response("Something went wrong", { status: 500 });
  }
};
