export const validatePayload = (item, validationResults) => {
  Object.entries(item).forEach(
    ([field, value]) =>
      (validationResults[field] = validateField(item, field, value))
  );

  const isValid = (value) => value === "Valid";
  if (!Object.values(validationResults).every(isValid)) {
    return false;
  }

  return true;
};

export const validateField = (item, field, value) => {
  if (isEmpty(value)) return "Invalid value: empty string";

  if (field === "quantity") {
    const quantity = Number(value);
    if (item.status === "In Stock" && quantity <= 0)
      return "Invalid value: quantity must be greater than 0 if in stock";
    if (item.status === "Out of Stock" && quantity > 0)
      return "Invalid value: quantity must be equal to 0 if out of stock";
  }

  if (field === "contact_phone") {
    if (!isValidPhone(value))
      return "Invalid value: phone number should match +1 (555) 555-5555";
  }

  if (field === "contact_email") {
    if (!isValidEmail(value))
      return "Invalid email: check email format for missing characters";
  }

  return "Valid";
};

export const isEmpty = (value) => value === undefined || value === "";

export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};
