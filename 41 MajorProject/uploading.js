const { cloudinary } = require("./cloudConfig");

cloudinary.uploader.upload("C:\Users\HP\Downloads\Screenshot.png", (error, result) => {
    if (error) {
        console.error("❌ Cloudinary Upload Error:", error);
    } else {
        console.log("🟢 Cloudinary Upload Success:", result);
    }
});
