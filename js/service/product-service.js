const productList = () => {
    return fetch("http://localhost:3000/productos")
    .then((res) => res.json())
    .catch((err)=>console.log(err))
};

const createProducts = (nombre, precio, imagen) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen
        })
        
    }) 
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/productos/${id}`, {
      method: "DELETE",
    })
   .then(response => response.json())
   .then(data => data) 
   .catch(error => console.error(error));
  }
  
export const servicesProducts = {
    productList,createProducts,deleteProduct,
}