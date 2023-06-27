import joi from "joi";


// sector validation schema
export const validateSector = (data) => {
    const schema = joi.object({
      name: joi.string().trim().required(),
      selectedSector: joi.string().trim().required(),
      term: joi.boolean.required(),
  
    });
    return schema.validate(data);
  };
  
