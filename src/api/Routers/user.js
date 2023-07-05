const express = require("express")

const imageUpload = require("../Helpers/Libraries/imageUpload");

const {profile,editProfile,changePassword,addStoryToReadList,readListPage} = require("../Controllers/user");
// const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const { iapJwtHandler } = require("../Middlewares/Authorization");


const router = express.Router() ;

router.get("/profile",iapJwtHandler ,profile)

router.post("/editProfile",[iapJwtHandler ,imageUpload.single("photo")],editProfile)

router.put("/changePassword",iapJwtHandler,changePassword)

router.post("/:slug/addStoryToReadList",iapJwtHandler ,addStoryToReadList)

router.get("/readList",iapJwtHandler ,readListPage)



module.exports = router