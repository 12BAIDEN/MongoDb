import { Router } from "express";
import { UserController } from "../controllers/userController.js";

let nonAuthRoute = Router()

/**
 register administrators to the system
* method: post
* domain: restricted to company selected users
*/
nonAuthRoute.post("/admin/donation", UserController.uploadDonations)

/**
 register logs users into the system
* method: post
* domain: public
*/
nonAuthRoute.post("/admin/type", UserController.uploadTypes)

/**
* sendVerification number
* method: get
* domain: public
*/
nonAuthRoute.get("/donations/:id", UserController.getDonationType)


export { nonAuthRoute };
