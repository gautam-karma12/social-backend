// imageController.js
const uploadImage = async (req, res) => {
	try {
	  if (!req.file) {
		return res.status(400).json({ message: "No image uploaded" });
	  }
  
	  const imagePath = `/uploads/${req.file.filename}`;  // Store image path
  
	  res.status(201).json({
		message: "Image uploaded successfully",
		imageUrl: imagePath
	  });
	} catch (err) {
	  console.error("Image Upload Error:", err);
	  res.status(500).json({
		data: err,
		message: "Server error",
		success: false
	  });
	}
  };
  
  module.exports = { uploadImage };
  