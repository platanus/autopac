// helper class that syncs the form with the data of the options page
class TransferenciaOptions {

    // initialize form data from another transferencia 
    constructor(obj){
        if (!obj) return;
        obj.monto && (this.monto = obj.monto);
        this.destinatario = {};
        if (obj.destinatario) {
            obj.destinatario.rut && (this.rutDestinatario = obj.destinatario.rut);
            obj.destinatario.banco && (this.bancoDestinatario = obj.destinatario.banco);
            obj.destinatario.nombre && (this.nombreDestinatario = obj.destinatario.nombre);
            obj.destinatario.numeroCuenta && (this.numeroCuentaDestinatario = obj.destinatario.numeroCuenta);
            obj.destinatario.tipoCuenta && (this.tipoCuentaDestinatario = obj.destinatario.tipoCuenta);
            obj.destinatario.mail && (this.mailDestinatario = obj.destinatario.mail);

        }
        this.programacion = {};
        if (obj.programacion) {
            obj.programacion.frecuencia && (this.frecuencia = obj.programacion.frecuencia);
            obj.programacion.fechaInicio && (this.fechaInicio = obj.programacion.fechaInicio);
            obj.programacion.fechaTermino && (this.fechaTermino = obj.programacion.fechaTermino);
        }
    }
    // Setters and getter helper functions to get and set data to the form 
    get monto(){
        return document.getElementById("monto").value
    }
    set monto(val){
        document.getElementById("monto").value = val;
    }

    get frecuencia(){
        return document.getElementById("frecuencia").value
    }
    set frecuencia(val){
        document.getElementById("frecuencia").value = val;
    }
    get fechaInicio(){
        return document.getElementById("fechaInicio").value
    }
    set fechaInicio(val){
        document.getElementById("fechaInicio").value = val;
    }
    get fechaTermino(){
        return document.getElementById("fechaTermino").value
    }
    set fechaTermino(val){
        document.getElementById("fechaTermino").value = val;
    }
    get rutDestinatario(){
        return document.getElementById("rutDestinatario").value
    }
    set rutDestinatario(val){
        document.getElementById("rutDestinatario").value = val;
    }
    get bancoDestinatario(){
        return document.getElementById("bancoDestinatario").value
    }
    set bancoDestinatario(val){
        document.getElementById("bancoDestinatario").value = val;
    }
    get nombreDestinatario(){
        return document.getElementById("nombreDestinatario").value
    }
    set nombreDestinatario(val){
        document.getElementById("nombreDestinatario").value = val;
    }
    get numeroCuentaDestinatario(){
        return document.getElementById("numeroCuentaDestinatario").value
    }
    set numeroCuentaDestinatario(val){
        document.getElementById("numeroCuentaDestinatario").value = val;
    }
    get tipoCuentaDestinatario(){
        return document.getElementById("tipoCuentaDestinatario").value
    }
    set tipoCuentaDestinatario(val){
        document.getElementById("tipoCuentaDestinatario").value = val;
    }
    get mailDestinatario(){
        return document.getElementById("mailDestinatario").value
    }
    set mailDestinatario(val){
        document.getElementById("mailDestinatario").value = val;
    }


    // returns raw data of the object (without setters and gettes) 
    toObject() {
        let obj = {};
        this.monto && (obj.monto = this.monto);

        obj.destinatario = {};
        this.rutDestinatario && (obj.destinatario.rut = this.rutDestinatario);
        this.bancoDestinatario && (obj.destinatario.banco = this.bancoDestinatario);
        this.nombreDestinatario && (obj.destinatario.nombre = this.nombreDestinatario);
        this.numeroCuentaDestinatario && (obj.destinatario.numeroCuenta = this.numeroCuentaDestinatario);
        this.tipoCuentaDestinatario && (obj.destinatario.tipoCuenta = this.tipoCuentaDestinatario);
        this.mailDestinatario && (obj.destinatario.mail = this.mailDestinatario);
        obj.programacion = {};
        this.frecuencia && (obj.programacion.frecuencia = this.frecuencia);
        this.fechaInicio && (obj.programacion.fechaInicio = this.fechaInicio);
        this.fechaTermino && (obj.programacion.fechaTermino = this.fechaTermino);
        // delete property if empty
        if (Object.keys(obj.destinatario).length === 0) delete obj.destinatario; 
        if (Object.keys(obj.programacion).length === 0) delete obj.programacion;
        

        return obj;
    }

    toString() {
        return String(this.toObject());
    }
}
