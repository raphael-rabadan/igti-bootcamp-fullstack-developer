import express from "express"
import cors from "cors"
import gradeController from "../controller-handler/grade.js"

const router = express.Router()

router.post("/", cors(), gradeController.create)

router.put("/", cors(), gradeController.update)

router.patch("/value", cors(), gradeController.updateValue)

router.delete("/:id", cors(), gradeController.exclude)

router.get("/total", cors(), gradeController.total)

router.get("/average", cors(), gradeController.average)

router.get("/bests", cors(), gradeController.bests)

router.get("/:id", cors(), gradeController.searchById)

router.use(gradeController.error)

export default router
