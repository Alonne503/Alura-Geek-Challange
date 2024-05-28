import { servicesProducts } from "../service/product-service.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");


function createCard(nombre, precio, imagen, id) {
    const card = document.createElement("div");
    card.classList.add("productos__item")

    card.innerHTML = `
        <div class="img__producto">
            <img src="${imagen}" alt="${nombre}">
        </div>
        <p class="name__product">${nombre}</p>
        <p class="precio__producto"> ${precio}</p>
        <button data-id="${id}" class="icon__trash">
            <img src="./img/icon _trash 2_.jpg">
        </button>
    </div>
    `

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const ListProduct = await servicesProducts.productList();
        ListProduct.forEach((product) => {
            productContainer.appendChild(
                createCard(
                    product.nombre,
                    product.precio,
                    product.imagen,
                    product.id
                )
                

            )
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.querySelector("[data-name]").value;
        const precio = document.querySelector("[data-price]").value;
        const imagen = document.querySelector("[data-image]").value;

        servicesProducts.createProducts(nombre, precio, imagen)
        .then((res)=> console.log(res))
        .catch((err) => console.log(err));
});

productContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("icon__trash")) {
      const id = event.target.dataset.id;
      try {
        await servicesProducts.deleteProduct(id);
        event.target.closest(".productos__item").remove(); // Elimina la tarjeta del DOM
      } catch (error) {
        console.error(error);
      }
    }
  });


render();


