const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;


class Citas{
constructor(){
    this.citas = [];
}

agregarCita(cita){
    this.citas = [...this.citas, cita];
    console.log(this.citas);
}
eliminarCita(id){
this.citas = this.citas.filter(cita => cita.id !== id);
}
editarCita(citaActualizada){
this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
}
}

class UI{
imprimirAlerta(mensaje, tipo){

    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center','alert','d-block','col-12');

    if(tipo === 'error'){
        divMensaje.classList.add('alert-danger');
    }else{
        divMensaje.classList.add('alert-success');

    }

    divMensaje.textContent = mensaje;
document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

setTimeout(() => {
    divMensaje.remove();
}, 5000);
}


imprimirCitas({citas}){

    this.limpiarHTML();
  citas.forEach(cita => {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    const divCita = document.createElement('div');
    divCita.classList.add('cita', 'p-3');
    divCita.dataset.id = id;

    const mascotaParrafo = document.createElement('h2');
    mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
    mascotaParrafo.textContent = mascota;

    const propietarioParrafo = document.createElement('p');
    propietarioParrafo.innerHTML = `
    <span class="font-weight-bolder">Propietario:</span> ${propietario}
    `;

    const telefonoParrafo = document.createElement('p');
    telefonoParrafo.innerHTML = `
    <span class="font-weight-bolder">telefono:</span> ${telefono}
    `;

    const fechaParrafo = document.createElement('p');
    fechaParrafo.innerHTML = `
    <span class="font-weight-bolder">fecha:</span> ${fecha}
    `;

    const horaParrafo = document.createElement('p');
    horaParrafo.innerHTML = `
    <span class="font-weight-bolder">hora:</span> ${hora}
    `;

    const sintomasParrafo = document.createElement('p');
    sintomasParrafo.innerHTML = `
    <span class="font-weight-bolder">sintomas:</span> ${sintomas}
    `;

    //boton eliminar cita
    const btnEliminar = document.createElement('p');
    btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
    btnEliminar.innerHTML = 'eliminar';

    btnEliminar.onclick = ()=> eliminarCita(id);

    //boton editar
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn','btn-info');
    btnEditar.innerHTML = 'editar';
    btnEditar.onclick = ()=> cargarEdicion(cita);

    divCita.appendChild(mascotaParrafo);
    divCita.appendChild(propietarioParrafo);
    divCita.appendChild(telefonoParrafo);
    divCita.appendChild(fechaParrafo);
    divCita.appendChild(horaParrafo);
    divCita.appendChild(sintomasParrafo);
    divCita.appendChild(btnEliminar);
    divCita.appendChild(btnEditar);

    contenedorCitas.appendChild(divCita);



  })
}
limpiarHTML(){
    while (contenedorCitas.firstChild) {
        contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
}

}
const ui = new UI();
const administrarCitas = new Citas;




eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);


    formulario.addEventListener('submit', nuevaCita);
}
const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

function datosCita(e) {
    citasObj[e.target.name] = e.target.value;
}
 
function nuevaCita(e) {
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

    if (mascota === ''|| propietario === ''|| telefono === ''|| fecha === ''|| hora === ''|| sintomas === '' ) {
    ui.imprimirAlerta('todos los campos son obligatorios', 'error');

        return;
    }

    if(editando){
        ui.imprimirAlerta('editando correctamente');
administrarCitas.editarCita({...citasObj});

        formulario.querySelector('button[type="submit"]').textContent = 'crear cita';

        editando = false;

    }else{
        citasObj.id = Date.now();

        //crear cita nueva
        administrarCitas.agregarCita({...citasObj});

        ui.imprimirAlerta('se agrego correctamente');
    }

    //generar id unico
    

    //reiniciar objeto
    reiniciarObjeto();

    //reiniciar el formulario
    formulario.reset();

    //mostrar html de las citas
    ui.imprimirCitas(administrarCitas);



}

function reiniciarObjeto() {
    citasObj.mascota = '',
    citasObj.propietario = '',
    citasObj.telefono = '',
    citasObj.fecha = '',
    citasObj.hora = '',
    citasObj.sintomas = ''
}

function eliminarCita(id) {
    administrarCitas.eliminarCita(id);
    ui.imprimirAlerta('la cita se elimino correctamente');

    ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

 //llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto
  citasObj.mascota = mascota;
  citasObj.propietario = propietario;
  citasObj.telefono = telefono;
  citasObj.fecha = fecha;
  citasObj.hora = hora;
  citasObj.sintomas = sintomas;
  citasObj.id = id;



    formulario.querySelector('button[type="submit"]').textContent = 'guardar cambios';

    editando = true;
}
