// =========================
// CLASES
// =========================

class Producto {

    constructor(nombre, precio, imagen, tipo){

        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.tipo = tipo;
    }

    descripcion(){

        return `${this.nombre} - S/. ${this.precio}`;
    }
}

class ProductoEspecial extends Producto{

    descripcion(){

        return ` Premium: ${this.nombre} - S/. ${this.precio}`;
    }
}

/* =========================
   PRODUCTOS
========================= */

const productos = new Map();

productos.set(
    1,
    new Producto(
        "Palo Santo Natural",
        12,
        "img/PaloSanto.jpeg",
        "Aromático"
    )
);

productos.set(
    2,
    new Producto(
        "Incienso Palo Santo",
        18,
        "img/incienso.jpeg",
        "Relajante"
    )
);

productos.set(
    3,
    new ProductoEspecial(
        "Combo Palo Santo + Velas",
        25,
        "img/combo.jpeg",
        "Premium"
    )
);

/* =========================
   RENDER PRODUCTOS
========================= */

const contenedor =
document.getElementById(
    "contenedorProductos"
);

if(contenedor){

    productos.forEach((prod, id)=>{

        const card =
        document.createElement("div");

        card.classList.add("producto");

        card.innerHTML = `

            <img src="${prod.imagen}"
            alt="${prod.nombre}">

            <h3>${prod.nombre}</h3>

            <p>${prod.tipo}</p>

            <p class="precio">
                S/. ${prod.precio}
            </p>

            <button data-id="${id}">
                Agregar al carrito
            </button>

        `;

        contenedor.appendChild(card);

    });

}

/* =========================
   CARRITO
========================= */

let carrito = [];

/* CONTADOR */

const actualizarContador = ()=>{

    const contador =
    document.getElementById(
        "contadorCarrito"
    );

    if(contador){

        contador.textContent =
        carrito.length;
    }
};

/* TOTAL */

const calcularTotal = ()=>{

    return carrito.reduce(
        (total, prod)=>
        total + prod.precio,
        0
    );
};

/* AGREGAR PRODUCTOS */

if(contenedor){

    contenedor.addEventListener(
        "click",
        (e)=>{

            if(
                e.target.tagName ===
                "BUTTON"
            ){

                const id =
                Number(
                    e.target.dataset.id
                );

                carrito.push(
                    productos.get(id)
                );

                actualizarContador();

                mostrarToast(
                    "Producto agregado"
                );
            }

        }
    );

}

/* =========================
   MODAL CARRITO
========================= */

const btnCarrito =
document.getElementById(
    "btnCarrito"
);

const modalCarrito =
document.getElementById(
    "modalCarrito"
);

const cerrarCarrito =
document.getElementById(
    "cerrarCarrito"
);

const listaCarrito =
document.getElementById(
    "listaCarrito"
);

const total =
document.getElementById(
    "total"
);

/* ABRIR MODAL */

if(
    btnCarrito &&
    modalCarrito &&
    cerrarCarrito
){

    btnCarrito.addEventListener(
        "click",
        ()=>{

            modalCarrito.style.display =
            "flex";

            renderCarrito();
        }
    );

    cerrarCarrito.addEventListener(
        "click",
        ()=>{

            modalCarrito.style.display =
            "none";
        }
    );

}

/* RENDER CARRITO */

function renderCarrito(){

    if(!listaCarrito) return;

    listaCarrito.innerHTML = "";

    carrito.forEach((prod,index)=>{

        const li =
        document.createElement("li");

        li.classList.add(
            "item-carrito"
        );

        li.innerHTML = `

            <span>
                ${prod.descripcion()}
            </span>

            <button
            class="btn-eliminar"
            data-index="${index}">
                ✕
            </button>

        `;

        listaCarrito.appendChild(li);

    });

    if(total){

        total.textContent =
        `Total: S/. ${calcularTotal()}`;
    }

    eliminarProductos();
}

/* ELIMINAR */

function eliminarProductos(){

    const botonesEliminar =
    document.querySelectorAll(
        ".btn-eliminar"
    );

    botonesEliminar.forEach(btn=>{

        btn.addEventListener(
            "click",
            ()=>{

                const index =
                btn.dataset.index;

                carrito.splice(index,1);

                actualizarContador();

                renderCarrito();

            }
        );

    });

}

/* =========================
   TOAST
========================= */

function mostrarToast(texto){

    const toast =
    document.getElementById(
        "toast"
    );

    if(!toast) return;

    toast.textContent = texto;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove(
            "show"
        );

    },2500);

}

/* =========================
   MENÚ LATERAL
========================= */

const menuBtn =
document.getElementById(
    "menu-btn"
);

const sideMenu =
document.getElementById(
    "sideMenu"
);

const overlay =
document.getElementById(
    "overlay"
);

if(
    menuBtn &&
    sideMenu &&
    overlay
){

    menuBtn.addEventListener(
        "click",
        ()=>{

            sideMenu.classList.add(
                "abierto"
            );

            overlay.classList.add(
                "visible"
            );
        }
    );

    overlay.addEventListener(
        "click",
        cerrarMenu
    );

    document.addEventListener(
        "keydown",
        (e)=>{

            if(e.key === "Escape"){

                cerrarMenu();
            }

        }
    );

}

/* CERRAR MENÚ */

function cerrarMenu(){

    sideMenu.classList.remove(
        "abierto"
    );

    overlay.classList.remove(
        "visible"
    );
}

/* =========================
   FOOTER AÑO
========================= */

const anio =
document.getElementById("anio");

if(anio){

    anio.textContent =
    new Date().getFullYear();
}