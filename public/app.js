// ==========================
// AUTENTICACIÓN
// ==========================

const loginSection = document.getElementById("login-section");
const panelSection = document.getElementById("panel-section");

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

const logoutButton = document.getElementById("logout-button");


// Iniciar sesión
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent = data.error || "Error al iniciar sesión";
            return;
        }

        localStorage.setItem("token", data.token);

        loginSection.style.display = "none";
        panelSection.style.display = "block";

        cargarCategorias();
        cargarProductos();
        cargarClientes();
        cargarVentas();

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        loginMessage.textContent = "Error de conexión con el servidor";
    }
});


// Cerrar sesión
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");

    panelSection.style.display = "none";
    loginSection.style.display = "block";

    loginForm.reset();
});


// ==========================
// FUNCIONES GENERALES
// ==========================

function obtenerToken() {
    return localStorage.getItem("token");
}


document.querySelectorAll(".cancelar-operacion").forEach((boton) => {
    boton.addEventListener("click", () => {
        const formulario = boton.closest('form');
        formulario.reset();

        const campoId = formulario.querySelector('input[type="hidden"][id$="-id"]');

        console.log(campoId.value);
        if (campoId){
            campoId.value = "";
        }

        console.log(campoId.value);

    });
});

function headersConToken() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    };
}


// ==========================
// NAVEGACIÓN
// ==========================

const botonesNavegacion = document.querySelectorAll("nav button");
const secciones = document.querySelectorAll("#panel-section > section");

botonesNavegacion.forEach((boton) => {

    boton.addEventListener("click", () => {

        const idSeccion = boton.dataset.section;

        secciones.forEach((seccion) => {
            seccion.style.display = "none";
        });

        document.getElementById(idSeccion).style.display = "block";
    });

});


// ==========================
// CATEGORÍAS
// ==========================

async function cargarCategorias() {

    try {
        const response = await fetch("/api/categorias");

        const categorias = await response.json();

        const tabla = document.getElementById("categorias-table");

        tabla.innerHTML = "";

        categorias.forEach((categoria) => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${categoria.id}</td>
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion || ""}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarCategoria(${categoria.id})">
                        Editar
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="eliminarCategoria(${categoria.id})">
                        Eliminar
                    </button>
                </td>
            `;

            tabla.appendChild(fila);
        });

        cargarCategoriasEnSelect();

    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}


// Crear o actualizar categoría
document.getElementById("categoria-form").addEventListener("submit", async (event) => {

    event.preventDefault();

    const id = document.getElementById("categoria-id").value;
    const nombre = document.getElementById("categoria-nombre").value;
    const descripcion = document.getElementById("categoria-descripcion").value;

    const url = id
        ? `/api/categorias/${id}`
        : "/api/categorias";

    const method = id ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
            method,
            headers: headersConToken(),
            body: JSON.stringify({
                nombre,
                descripcion
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al guardar categoría");
            return;
        }

        event.target.reset();

        document.getElementById("categoria-id").value = "";

        cargarCategorias();

    } catch (error) {
        console.error("Error al guardar categoría:", error);
    }
});


async function editarCategoria(id) {

    try {

        const response = await fetch(`/api/categorias/${id}`);

        const categoria = await response.json();

        document.getElementById("categoria-id").value = categoria.id;
        document.getElementById("categoria-nombre").value = categoria.nombre;
        document.getElementById("categoria-descripcion").value =
            categoria.descripcion || "";

    } catch (error) {
        console.error("Error al obtener categoría:", error);
    }
}


async function eliminarCategoria(id) {

    if (!confirm("¿Desea eliminar esta categoría?")) {
        return;
    }

    try {

        const response = await fetch(`/api/categorias/${id}`, {
            method: "DELETE",
            headers: headersConToken()
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al eliminar categoría");
            return;
        }

        cargarCategorias();

    } catch (error) {
        console.error("Error al eliminar categoría:", error);
    }
}


// ==========================
// PRODUCTOS
// ==========================

async function cargarProductos() {

    try {

        const response = await fetch("/api/productos");

        const productos = await response.json();

        const tabla = document.getElementById("productos-table");

        tabla.innerHTML = "";

        productos.forEach((producto) => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.sku}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.Categoria?.nombre || ""}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarProducto(${producto.id})">
                        Editar
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})">
                        Eliminar
                    </button>
                </td>
            `;

            tabla.appendChild(fila);
        });

        cargarProductosEnSelect();

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}


// Cargar categorías en el select de productos
async function cargarCategoriasEnSelect() {

    try {

        const response = await fetch("/api/categorias");

        const categorias = await response.json();

        const select = document.getElementById("producto-categoria");

        select.innerHTML = `
            <option value="">Seleccione una categoría</option>
        `;

        categorias.forEach((categoria) => {

            const option = document.createElement("option");

            option.value = categoria.id;
            option.textContent = categoria.nombre;

            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar categorías en select:", error);
    }
}


// Crear o actualizar producto
document.getElementById("producto-form").addEventListener("submit", async (event) => {

    event.preventDefault();

    const id = document.getElementById("producto-id").value;

    const sku = document.getElementById("producto-sku").value;
    const nombre = document.getElementById("producto-nombre").value;
    const precio = Number(document.getElementById("producto-precio").value);
    const stock = Number(document.getElementById("producto-stock").value);
    const categoriaId = Number(document.getElementById("producto-categoria").value);

    const url = id
        ? `/api/productos/${id}`
        : "/api/productos";

    const method = id ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
            method,
            headers: headersConToken(),
            body: JSON.stringify({
                sku,
                nombre,
                precio,
                stock,
                categoriaId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al guardar producto");
            return;
        }

        event.target.reset();

        document.getElementById("producto-id").value = "";

        cargarProductos();

    } catch (error) {
        console.error("Error al guardar producto:", error);
    }
});


async function editarProducto(id) {

    try {

        const response = await fetch(`/api/productos/${id}`);

        const producto = await response.json();

        document.getElementById("producto-id").value = producto.id;
        document.getElementById("producto-sku").value = producto.sku;
        document.getElementById("producto-nombre").value = producto.nombre;
        document.getElementById("producto-precio").value = producto.precio;
        document.getElementById("producto-stock").value = producto.stock;
        document.getElementById("producto-categoria").value = producto.categoriaId;

    } catch (error) {
        console.error("Error al obtener producto:", error);
    }
}


async function eliminarProducto(id) {

    if (!confirm("¿Desea eliminar este producto?")) {
        return;
    }

    try {

        const response = await fetch(`/api/productos/${id}`, {
            method: "DELETE",
            headers: headersConToken()
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al eliminar producto");
            return;
        }

        cargarProductos();

    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}


// ==========================
// CLIENTES
// ==========================

async function cargarClientes() {

    try {

        const response = await fetch("/api/clientes");

        const clientes = await response.json();

        const tabla = document.getElementById("clientes-table");

        tabla.innerHTML = "";

        clientes.forEach((cliente) => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefono || ""}</td>
                <td>${cliente.direccion || ""}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarCliente(${cliente.id})">
                        Editar
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${cliente.id})">
                        Eliminar
                    </button>
                </td>
            `;

            tabla.appendChild(fila);
        });

        cargarClientesEnSelect();

    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}


// Cargar clientes en el select de ventas
async function cargarClientesEnSelect() {

    try {

        const response = await fetch("/api/clientes");

        const clientes = await response.json();

        const select = document.getElementById("venta-cliente");

        select.innerHTML = `
            <option value="">Seleccione un cliente</option>
        `;

        clientes.forEach((cliente) => {

            const option = document.createElement("option");

            option.value = cliente.id;
            option.textContent = cliente.nombre;

            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}


// Crear o actualizar cliente
document.getElementById("cliente-form").addEventListener("submit", async (event) => {

    event.preventDefault();

    const id = document.getElementById("cliente-id").value;

    const nombre = document.getElementById("cliente-nombre").value;
    const email = document.getElementById("cliente-email").value;
    const telefono = document.getElementById("cliente-telefono").value;
    const direccion = document.getElementById("cliente-direccion").value;

    const url = id
        ? `/api/clientes/${id}`
        : "/api/clientes";

    const method = id ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
            method,
            headers: headersConToken(),
            body: JSON.stringify({
                nombre,
                email,
                telefono,
                direccion
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al guardar cliente");
            return;
        }

        event.target.reset();

        document.getElementById("cliente-id").value = "";

        cargarClientes();

    } catch (error) {
        console.error("Error al guardar cliente:", error);
    }
});


async function editarCliente(id) {

    try {

        const response = await fetch(`/api/clientes/${id}`);

        const cliente = await response.json();

        document.getElementById("cliente-id").value = cliente.id;
        document.getElementById("cliente-nombre").value = cliente.nombre;
        document.getElementById("cliente-email").value = cliente.email;
        document.getElementById("cliente-telefono").value =
            cliente.telefono || "";
        document.getElementById("cliente-direccion").value =
            cliente.direccion || "";

    } catch (error) {
        console.error("Error al obtener cliente:", error);
    }
}


async function eliminarCliente(id) {

    if (!confirm("¿Desea eliminar este cliente?")) {
        return;
    }

    try {

        const response = await fetch(`/api/clientes/${id}`, {
            method: "DELETE",
            headers: headersConToken()
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al eliminar cliente");
            return;
        }

        cargarClientes();

    } catch (error) {
        console.error("Error al eliminar cliente:", error);
    }
}


// ==========================
// VENTAS
// ==========================

async function cargarVentas() {

    try {

        const response = await fetch("/api/ventas");

        const ventas = await response.json();

        const tabla = document.getElementById("ventas-table");

        tabla.innerHTML = "";

        ventas.forEach((venta) => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${venta.id}</td>
                <td>${venta.Producto?.nombre || ""}</td>
                <td>${venta.Cliente?.nombre || ""}</td>
                <td>${venta.cantidad}</td>
                <td>${venta.total}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarVenta(${venta.id})">
                        Editar
                    </button>

                    <button class="btn btn-sm btn-danger" onclick="eliminarVenta(${venta.id})">
                        Eliminar
                    </button>
                </td>
            `;

            tabla.appendChild(fila);
        });

        cargarProductosEnSelect();
        cargarClientesEnSelect();

    } catch (error) {
        console.error("Error al cargar ventas:", error);
    }
}


// Cargar productos en el select de ventas
async function cargarProductosEnSelect() {

    try {

        const response = await fetch("/api/productos");

        const productos = await response.json();

        const select = document.getElementById("venta-producto");

        select.innerHTML = `
            <option value="">Seleccione un producto</option>
        `;

        productos.forEach((producto) => {

            const option = document.createElement("option");

            option.value = producto.id;
            option.textContent = producto.nombre;

            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}


// Crear o actualizar venta
document.getElementById("venta-form").addEventListener("submit", async (event) => {

    event.preventDefault();

    const id = document.getElementById("venta-id").value;

    const productoId = Number(document.getElementById("venta-producto").value);
    const clienteId = Number(document.getElementById("venta-cliente").value);
    const cantidad = Number(document.getElementById("venta-cantidad").value);
    const total = Number(document.getElementById("venta-total").value);

    const url = id
        ? `/api/ventas/${id}`
        : "/api/ventas";

    const method = id ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
            method,
            headers: headersConToken(),
            body: JSON.stringify({
                productoId,
                clienteId,
                cantidad,
                total
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al guardar venta");
            return;
        }

        event.target.reset();

        document.getElementById("venta-id").value = "";

        cargarVentas();

    } catch (error) {
        console.error("Error al guardar venta:", error);
    }
});


async function editarVenta(id) {

    try {

        const response = await fetch(`/api/ventas/${id}`);

        const venta = await response.json();

        document.getElementById("venta-id").value = venta.id;
        document.getElementById("venta-producto").value = venta.productoId;
        document.getElementById("venta-cliente").value = venta.clienteId;
        document.getElementById("venta-cantidad").value = venta.cantidad;
        document.getElementById("venta-total").value = venta.total;

    } catch (error) {
        console.error("Error al obtener venta:", error);
    }
}


async function eliminarVenta(id) {

    if (!confirm("¿Desea eliminar esta venta?")) {
        return;
    }

    try {

        const response = await fetch(`/api/ventas/${id}`, {
            method: "DELETE",
            headers: headersConToken()
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al eliminar venta");
            return;
        }

        cargarVentas();

    } catch (error) {
        console.error("Error al eliminar venta:", error);
    }
}


// ==========================
// INICIO
// ==========================

if (obtenerToken()) {

    loginSection.style.display = "none";
    panelSection.style.display = "block";

    cargarCategorias();
    cargarProductos();
    cargarClientes();
    cargarVentas();

}
