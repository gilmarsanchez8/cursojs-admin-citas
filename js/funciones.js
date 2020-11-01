import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario} from './selectores.js'; 

//Instancias
const ui = new UI();
const administrarCitas = new Citas();

let editando;

//Objeto con la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agregar datos al objeto cita
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    //console.log(citaObj);
}

//Valida y agrega una nueva cita a la clase Citas
export function nuevaCita(e){
    e.preventDefault();

    //Extraer información del objeto cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Cita editada correctamente');

        administrarCitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        //Quitar modo edición
        editando = false;
    }else{
        //Generar id único
        citaObj.id = Date.now();

        //Creando una cita
        administrarCitas.agregarCita({...citaObj});

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Cita agregada correctamente');
    }

    //Reiniciar el objeto para la validación
    reiniciarObjeto();

    //Reiniciar el formulario
    formulario.reset();

    //Imprimir citas
    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id){
    //Eliminar cita
    administrarCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta('Cita eliminada correctamente');

    //Refrescar el HTML
    ui.imprimirCitas(administrarCitas);
}

//Cargar datos en modo edición
export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
    
    editando = true;
}