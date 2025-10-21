import { baseURL } from '../../../../config/config';

export let reclamos = [];
export let reclamoActivo = null;
export let contadorReclamos = 1;

export function cargarDatos() {
    const datosGuardados = JSON.parse(sessionStorage.getItem('reclamos_chat') || '[]');
    const contadorGuardado = sessionStorage.getItem('contador_reclamos');
    
    if (datosGuardados.length > 0) reclamos = datosGuardados;
    if (contadorGuardado) contadorReclamos = parseInt(contadorGuardado);
}

export function guardarDatos() {
    sessionStorage.setItem('reclamos_chat', JSON.stringify(reclamos));
    sessionStorage.setItem('contador_reclamos', contadorReclamos.toString());
}

export async function crearReclamoAPI(formData) {
    const nuevoReclamo = {
        title: formData.get('titulo'),
        category: formData.get('categoria'),
        priority: formData.get('prioridad'),
        location: formData.get('ubicacion') || 'No especificada',
        description: formData.get('descripcion'),
        dni: localStorage.getItem('dni')
    };

    const res = await fetch(`${baseURL}/bg/v1/client/complaints`, {
        method: 'POST',
        headers: { 
            'x-api-key': 'hola',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(nuevoReclamo)
    });

    if (!res.ok) throw new Error('Error al crear el reclamo');
    return await res.json();
}

export function filtrarReclamosAPI(termino) {
    return reclamos.filter(r =>
        r.titulo.toLowerCase().includes(termino) ||
        r.id.toLowerCase().includes(termino) ||
        r.categoria.toLowerCase().includes(termino)
    );
}