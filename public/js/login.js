document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
            // Guardar datos del usuario en localStorage
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirigir según el tipo de usuario
            if (data.user.tipo_usuario === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "index.html";
            }
        } else {
            alert(data.message || "Error al iniciar sesión.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error en el servidor.");
    }
});
