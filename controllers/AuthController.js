import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, {
      expiresIn: maxAge,
    });
  };

  
  export const signup = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send("Email and password is required");
      }
      const user = await User.create({ email, password });
      res.cookie("jwt", createToken(email, user.id), {
        maxAge,
        secure: true,
        samSite: "None",
      });
      return res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          // firstName:user.firstName,
          // lastName:user.lastName,
          profileSetup: user.profileSetup,
        },
      });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal server error");
    }
  };

  export const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send("Email and password is required.");
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("User with this email does not exist.");
      }
  
      const auth = await compare(password, user.password);
      if (!auth) {
        return res.status(400).send("Password is incorrect.");
      }
      res.cookie("jwt", createToken(email, user.id), {
        maxAge,
        secure: true,
        samSite: "None",
      });
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          areaOfLand: user.areaOfLand,
          location: user.location,

          profileSetup: user.profileSetup,
        },
      });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal server error");
    }
  };
  

  export const getUserInfo = async (req, res, next) => {
    try {
      const userData = await User.findById(req.userId);
      if (!userData) {
        return res.status(404).send("User with given id not found");
      }
      return res.status(200).json({
        id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          areaOfLand: userData.areaOfLand,
          location: userData.location,

          profileSetup: userData.profileSetup,
      },)
      
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal server error");
    }
  };

  

// export const updateProfile = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     const { firstName, lastName, areaOfLand, location } = req.body;
//     if (!firstName || !lastName) {
//       return res
//         .status(400)
//         .send("Firstname and Lastname are required.");
//     }

//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         firstName,
//         lastName,
//         areaOfLand,
//         location,
//         profileSetup: true,
//       },
//       { new: true, runValidators: true }
//     );

//     return res.status(200).json({
//       id: userData.id,
//           email: userData.email,
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           areaOfLand: userData.areaOfLand,
//           location: userData.location,

//           profileSetup: userData.profileSetup,
//     });
//   } catch (error) {
//     console.log({ error });
//     return res.status(500).send("Internal server error");
//   }
// };
  
export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;  // Ensure this is coming from auth middleware or session
    const { firstName, lastName, areaOfLand, location } = req.body;

    // Validation for required fields
    if (!firstName || !lastName) {
      return res.status(400).json({ message: "Firstname and Lastname are required." });
    }

    // Optional validation for location array (latitude and longitude)
    if (!Array.isArray(location) || location.length !== 2) {
      return res.status(400).json({ message: "Invalid location format. Expecting [latitude, longitude]." });
    }

    // Update user profile with the new data
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        areaOfLand,
        location,
        profileSetup: true,
      },
      { new: true, runValidators: true }  // Return updated document and apply schema validation
    );

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the updated user data
    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      areaOfLand: userData.areaOfLand,
      location: userData.location,
      profileSetup: userData.profileSetup,
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {maxAge:1, secure:true, sameSite:"None"})
    return res.status(200).send("Logout successful");
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error");
  }
};
