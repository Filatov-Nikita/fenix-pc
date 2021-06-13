function toFormData(body) {
  const formData = new FormData();
  for (let key in body) {
    formData.append(key, body[key]);
  }
  return formData;
}

export { toFormData };
