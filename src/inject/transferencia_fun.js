// valor de transferencia por defecto
// TODO eliminar datos predeterminados de mi mama :)
const TRANSFERENCIA_DEFAULT = {
    origen: {},
    destinatario: {},
    monto: 50000,
    rut_destinatario: "8.199.935-k",
    programacion: {
        fechaInicio: "12-02-2018",
        fechaTermino: "05-09-2019",
        frecuencia: "MENSUAL"
    }
};

// transferencia es variable global
window.transferencia = TRANSFERENCIA_DEFAULT;

// recibe valor de la transferencia desde la extension
window.addEventListener("message", function(event) {
    window.transferencia = JSON.parse(event.data.message)
    console.log("recibido transferencia", transferencia);
    window.transferencia.rutDestinatario && (window.transferencia.rut_destinatario = window.transferencia.rutDestinatario);
    window.transferencia.programacion = {}
    window.transferencia.frecuencia && (window.transferencia.programacion.frecuencia = window.transferencia.frecuencia);
    window.transferencia.fechaInicio && (window.transferencia.programacion.fechaInicio = window.transferencia.fechaInicio);
    window.transferencia.fechaTermino && (window.transferencia.programacion.fechaTermino = window.transferencia.fechaTermino);
});
