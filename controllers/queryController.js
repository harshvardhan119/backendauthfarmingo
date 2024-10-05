import queries from "../models/queryModel.js";

export const sendQuery = async (req, res, next) => {
  try {

    const { fname, lname, email, message } = req.body;

    if (!fname || !lname || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await queries.create({ fname, lname, email, message });

    return res.status(201).json({
      success: true,
      user: {
        fname,
        lname,
        email,
        message
      },
      msg: "Query submitted successfully!"
    });
  } catch (error) {
    console.error("Error in sendQuery:", error);
    
    return res.status(500).json({ msg: "Internal server error", error });
  }
};
