// =========================
// FORMULARIO CONTACTO
// =========================

const form = document.getElementById("formContacto");

const confirmacion =
document.getElementById("confirmacion");

if(form){

    form.addEventListener("submit", (e)=>{

        e.preventDefault();

        const nombre =
        document.getElementById("nombre")
        .value
        .trim();

        const correo =
        document.getElementById("correo")
        .value
        .trim();

        const mensaje =
        document.getElementById("mensaje")
        .value
        .trim();

        // VALIDACIÓN

        if(
            nombre === "" ||
            correo === "" ||
            mensaje === ""
        ){

            mostrarMensaje(
                "Completa todos los campos.",
                "#ff4d4d"
            );

            return;
        }

        // VALIDACIÓN EMAIL

        const regexCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regexCorreo.test(correo)){

            mostrarMensaje(
                "Ingresa un correo válido.",
                "#ff4d4d"
            );

            return;
        }

        // MENSAJE ÉXITO

        mostrarMensaje(
            `Gracias ${nombre}, tu mensaje fue enviado ✨`,
            "#4CAF50"
        );

        form.reset();

    });

}

// =========================
// FUNCIÓN MENSAJE
// =========================

function mostrarMensaje(texto, color){

    confirmacion.textContent = texto;

    confirmacion.style.color = color;

    confirmacion.style.marginTop = "20px";

    confirmacion.style.fontWeight = "bold";

    confirmacion.style.textAlign = "center";

    confirmacion.style.opacity = "0";

    // ANIMACIÓN

    setTimeout(()=>{

        confirmacion.style.transition =
        "0.4s ease";

        confirmacion.style.opacity = "1";

    },100);

}