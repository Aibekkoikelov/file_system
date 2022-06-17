const {Router} = require("express");

const FileService = require("../service/file.service")
const router = Router()

router.get("/", (req, res) => {
    return FileService.getAllFiles(req, res)
})
router.post("/add", (req, res) => {
    return FileService.upLoadNewFile(req, res)
})
router.get("/:fileName", (req, res) => {
    return FileService.getOneByFileName(req, res)
})
router.put("/:fileName",  (req, res) => {
    return FileService.upDateFile(req, res)
})


module.exports = router



