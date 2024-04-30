const express = require("express");

const {
  validation,
  ctrlWrapper,
  isValidId,
  authenticate,
} = require("../../middlewares");
const schemas = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.contactSchema),
  ctrlWrapper(ctrl.add)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.contactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
