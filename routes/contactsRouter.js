import express from "express";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";
import isValidId from "../helpers/isValid.js";
import authenticate from "../middlewares/authMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateStatusSchema),
  updateStatus
);

export default contactsRouter;
