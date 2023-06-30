export default function form(
  name: any,
  collection: any,
  description: any,
  image: any,
  for_sale: any,
  price: any,
  print_number: any,
  metadataX: any,
  metadataY: any
) {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("collection", collection);
  formData.append("description", description);
  formData.append("image", image);
  formData.append("active", for_sale);
  formData.append("price", price);
  formData.append("print_number", print_number);
  formData.append("metadataX", metadataX);
  formData.append("metadataY", metadataY);

  return formData;
}
