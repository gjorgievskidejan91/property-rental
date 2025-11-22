import connectDB from "@/config/database";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { username, email, password } = await request.json();

    console.log("Registering user:", email);

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
