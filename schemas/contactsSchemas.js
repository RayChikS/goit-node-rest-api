import Joi from "joi";
import { addContact } from "./contactsService";

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).max(14).required(),
});

export const createContact = async (req, res) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
