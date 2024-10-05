import pesticides from "../models/cropsModel.js";  


export const getCropByName = async (req, res) => {
  try {
    
    const { name } = req.params;

    
    const crop = await pesticides.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    
    if (!crop) {
      return res.status(404).json({ success: false, message: "Crop not found" });
    }

    
    return res.status(200).json({
      success: true,
      data: crop
    });
  } catch (error) {
    console.error("Error retrieving crop data:", error);

    
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export default getCropByName;
