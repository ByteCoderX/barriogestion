<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuario - Registro de Invitados</title>
    <link rel="stylesheet" href="./invitados.css">
    <link rel="stylesheet" href="../../../index.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <nav class="navbar">
        <h1>Registro de Invitados </h1>
    </nav>

    <div class="container">
        <!-- Estadísticas del usuario -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="misInvitados">0</div>
                <div class="stat-label">Mis Invitados</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="invitadosAutorizados">0</div>
                <div class="stat-label">Autorizados</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="invitadosPendientes">0</div>
                <div class="stat-label">Pendientes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="invitadosRechazados">0</div>
                <div class="stat-label">Rechazados</div>
            </div>
        </div>

        <!-- Formulario para registrar invitado -->
        <div class="form-section">
            <h2 class="form-title">Registrar Nuevo Invitado</h2>
            
            <div id="alertContainer"></div>

            <form id="invitadoForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="nombre">Nombre del Invitado *</label>
                        <input type="text" id="nombre" name="nombre" required placeholder="Ingrese el nombre">
                    </div>
                    
                    <div class="form-group">
                        <label for="apellido">Apellido *</label>
                        <input type="text" id="apellido" name="apellido" required placeholder="Ingrese el apellido">
                    </div>
                    
                    <div class="form-group">
                        <label for="dni">DNI *</label>
                        <input type="text" id="dni" name="dni" required maxlength="20" placeholder="Ej: 12345678">
                    </div>
                    
                    <div class="form-group">
                        <label for="telefono">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" placeholder="Ej: +54 9 11 1234-5678">
                    </div>
                    
                    <div class="form-group">
                        <label for="fechaVisita">Fecha de Visita *</label>
                        <input type="date" id="fechaVisita" name="fechaVisita" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="horaVisita">Hora Aproximada</label>
                        <input type="time" id="horaVisita" name="horaVisita">
                    </div>
                    
                    <div class="form-group">
                        <label for="permiso">Tipo de Visita *</label>
                        <select id="permiso" name="permiso" required>
                            <option value="">Seleccionar tipo...</option>
                            <option value="una_vez">Una sola vez</option>
                            <option value="temporal">Temporal (varios días)</option>
                            <option value="permanente">Permanente</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="motivo">Motivo de la Visita</label>
                        <select id="motivo" name="motivo">
                            <option value="">Seleccionar motivo...</option>
                            <option value="familiar">Visita familiar</option>
                            <option value="social">Visita social</option>
                            <option value="trabajo">Trabajo/Servicio</option>
                            <option value="delivery">Delivery</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="observaciones">Observaciones Adicionales</label>
                    <textarea id="observaciones" name="observaciones" rows="3" placeholder="Información adicional sobre la visita (opcional)"></textarea>
                </div>
                
                <button type="submit" class="btn">Registrar Invitado</button>
            </form>
        </div>

        <!-- Tabla de mis invitados -->
        <div class="table-section">
            <div class="table-header">
                <h2>Mis Invitados Registrados</h2>
            </div>
            <div class="table-container">
                <table id="invitadosTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Fecha Visita</th>
                            <th>Hora</th>
                            <th>Tipo</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="invitadosTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Simulación de base de datos del usuario usando variables JavaScript
        class InvitadosUsuarioDB {
            constructor() {
                this.invitados = [];
                this.usuarioActual = {
                    id: 1,
                    nombre: 'Juan Pérez',
                    lote: 'Lote 15',
                    telefono: '123456789'
                };
                this.initializeData();
            }

            initializeData() {
                // Inicializar algunos invitados de ejemplo para el usuario actual
                if (this.invitados.length === 0) {
                    const invitadosIniciales = [
                        {
                            id_invitado: 1,
                            nombre: 'Roberto',
                            apellido: 'González',
                            dni: '12345678',
                            telefono: '987654321',
                            fecha_visita: '2024-12-20',
                            hora_visita: '15:00',
                            permiso: 'temporal',
                            motivo: 'familiar',
                            observaciones: 'Visita de fin de semana',
                            estado: 'autorizada',
                            fecha_creacion: '2024-12-15',
                            usuario_solicitante: this.usuarioActual.id
                        },
                        {
                            id_invitado: 2,
                            nombre: 'Laura',
                            apellido: 'Fernández',
                            dni: '87654321',
                            telefono: '456789123',
                            fecha_visita: '2024-12-18',
                            hora_visita: '10:30',
                            permiso: 'una_vez',
                            motivo: 'trabajo',
                            observaciones: 'Técnico de reparaciones',
                            estado: 'pendiente',
                            fecha_creacion: '2024-12-16',
                            usuario_solicitante: this.usuarioActual.id
                        }
                    ];
                    this.invitados = invitadosIniciales;
                }
            }

            getInvitadosUsuario() {
                return this.invitados.filter(inv => inv.usuario_solicitante === this.usuarioActual.id);
            }

            addInvitado(invitado) {
                const newId = this.invitados.length > 0 ? Math.max(...this.invitados.map(v => v.id_invitado)) + 1 : 1;
                
                const newInvitado = {
                    id_invitado: newId,
                    nombre: invitado.nombre,
                    apellido: invitado.apellido,
                    dni: invitado.dni,
                    telefono: invitado.telefono || '',
                    fecha_visita: invitado.fechaVisita,
                    hora_visita: invitado.horaVisita || '',
                    permiso: invitado.permiso,
                    motivo: invitado.motivo || '',
                    observaciones: invitado.observaciones || '',
                    estado: 'pendiente', // Los usuarios crean invitados en estado pendiente
                    fecha_creacion: new Date().toISOString().split('T')[0],
                    usuario_solicitante: this.usuarioActual.id
                };

                this.invitados.push(newInvitado);
                return newInvitado;
            }

            deleteInvitado(id) {
                const index = this.invitados.findIndex(v => v.id_invitado === id && v.usuario_solicitante === this.usuarioActual.id);
                if (index !== -1) {
                    // Solo permitir eliminar si está pendiente
                    if (this.invitados[index].estado === 'pendiente') {
                        this.invitados.splice(index, 1);
                        return true;
                    }
                    return false; // No se puede eliminar si ya fue procesado
                }
                return false;
            }

            updateInvitado(id, datosActualizados) {
                const index = this.invitados.findIndex(v => v.id_invitado === id && v.usuario_solicitante === this.usuarioActual.id);
                if (index !== -1 && this.invitados[index].estado === 'pendiente') {
                    // Solo permitir editar si está pendiente
                    Object.assign(this.invitados[index], datosActualizados);
                    return true;
                }
                return false;
            }

            getUsuarioActual() {
                return this.usuarioActual;
            }
        }

        // Inicializar base de datos
        const dbUsuario = new InvitadosUsuarioDB();

        // Referencias DOM
        const invitadoForm = document.getElementById('invitadoForm');
        const alertContainer = document.getElementById('alertContainer');
        const invitadosTableBody = document.getElementById('invitadosTableBody');

        // Función para mostrar alertas
        function showAlert(message, type = 'success') {
            alertContainer.innerHTML = `
                <div class="alert alert-${type}">
                    ${message}
                </div>
            `;
            setTimeout(() => {
                alertContainer.innerHTML = '';
            }, 5000);
        }

        // Actualizar información del usuario en el header
        function updateUserInfo() {
            const usuario = dbUsuario.getUsuarioActual();
            document.getElementById('usuarioNombre').textContent = `${usuario.nombre} - ${usuario.lote}`;
        }

        // Actualizar estadísticas
        function updateStats() {
            const invitados = dbUsuario.getInvitadosUsuario();
            const total = invitados.length;
            const autorizados = invitados.filter(v => v.estado === 'autorizada').length;
            const pendientes = invitados.filter(v => v.estado === 'pendiente').length;
            const rechazados = invitados.filter(v => v.estado === 'rechazada').length;

            document.getElementById('misInvitados').textContent = total;
            document.getElementById('invitadosAutorizados').textContent = autorizados;
            document.getElementById('invitadosPendientes').textContent = pendientes;
            document.getElementById('invitadosRechazados').textContent = rechazados;
        }

        // Renderizar tabla de invitados
        function renderInvitadosTable() {
            const invitados = dbUsuario.getInvitadosUsuario();
            
            invitadosTableBody.innerHTML = '';

            if (invitados.length === 0) {
                invitadosTableBody.innerHTML = `
                    <tr>
                        <td colspan="10" style="text-align: center; color: #888;">
                            No tienes invitados registrados aún
                        </td>
                    </tr>
                `;
                return;
            }

            invitados.forEach(invitado => {
                const row = document.createElement('tr');
                
                // Formatear la hora para mostrar
                const horaDisplay = invitado.hora_visita || 'No especificada';
                const motivoDisplay = invitado.motivo || '-';
                
                row.innerHTML = `
                    <td>${invitado.id_invitado}</td>
                    <td>${invitado.nombre}</td>
                    <td>${invitado.apellido}</td>
                    <td>${invitado.dni}</td>
                    <td>${invitado.fecha_visita}</td>
                    <td>${horaDisplay}</td>
                    <td>${invitado.permiso}</td>
                    <td>${motivoDisplay}</td>
                    <td><span class="status status-${invitado.estado}">${invitado.estado.charAt(0).toUpperCase() + invitado.estado.slice(1)}</span></td>
                    <td>
                        <div class="action-buttons">
                            ${invitado.estado === 'pendiente' ? 
                                `<button class="btn btn-small" onclick="editarInvitado(${invitado.id_invitado})" title="Editar">Editar</button>
                                <button class="btn btn-small btn-danger" onclick="eliminarInvitado(${invitado.id_invitado})" title="Eliminar">Eliminar</button>` :
                                `<button class="btn btn-small" onclick="verDetalles(${invitado.id_invitado})" title="Ver detalles">Ver</button>`
                            }
                        </div>
                    </td>
                `;
                invitadosTableBody.appendChild(row);
            });
        }

        // Validar DNI (solo números y longitud adecuada)
        function validarDNI(dni) {
            const dniRegex = /^\d{7,8}$/;
            return dniRegex.test(dni.replace(/\D/g, ''));
        }

        // Manejar envío del formulario
        invitadoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(invitadoForm);
            const invitadoData = Object.fromEntries(formData);

            // Validaciones adicionales
            if (!validarDNI(invitadoData.dni)) {
                showAlert('❌ El DNI debe tener entre 7 y 8 dígitos', 'error');
                return;
            }

            // Verificar si la fecha no es en el pasado
            const fechaVisita = new Date(invitadoData.fechaVisita);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            if (fechaVisita < hoy) {
                showAlert('❌ La fecha de visita no puede ser anterior a hoy', 'error');
                return;
            }

            // Verificar DNI duplicado para la misma fecha
            const invitadosExistentes = dbUsuario.getInvitadosUsuario();
            const dniDuplicado = invitadosExistentes.find(inv => 
                inv.dni === invitadoData.dni && 
                inv.fecha_visita === invitadoData.fechaVisita &&
                inv.estado !== 'rechazada'
            );

            if (dniDuplicado) {
                showAlert('❌ Ya existe un invitado con este DNI para la fecha seleccionada', 'error');
                return;
            }

            try {
                const newInvitado = dbUsuario.addInvitado(invitadoData);
                showAlert('✅ Invitado registrado exitosamente. Esperando autorización del administrador.', 'success');
                invitadoForm.reset();
                renderInvitadosTable();
                updateStats();
            } catch (error) {
                showAlert('❌ Error al registrar el invitado: ' + error.message, 'error');
            }
        });

        // Función para eliminar invitado (solo si está pendiente)
        window.eliminarInvitado = function(id) {
            const invitados = dbUsuario.getInvitadosUsuario();
            const invitado = invitados.find(inv => inv.id_invitado === id);
            
            if (!invitado) {
                showAlert('❌ Invitado no encontrado', 'error');
                return;
            }

            if (invitado.estado !== 'pendiente') {
                showAlert('❌ No puedes eliminar un invitado que ya fue procesado por el administrador', 'error');
                return;
            }

            if (confirm(`¿Estás seguro de que deseas eliminar el invitado ${invitado.nombre} ${invitado.apellido}?`)) {
                if (dbUsuario.deleteInvitado(id)) {
                    showAlert('✅ Invitado eliminado exitosamente', 'success');
                    renderInvitadosTable();
                    updateStats();
                } else {
                    showAlert('❌ Error al eliminar el invitado', 'error');
                }
            }
        };

        // Función para editar invitado (solo si está pendiente)
        window.editarInvitado = function(id) {
            const invitados = dbUsuario.getInvitadosUsuario();
            const invitado = invitados.find(inv => inv.id_invitado === id);
            
            if (!invitado) {
                showAlert('❌ Invitado no encontrado', 'error');
                return;
            }

            if (invitado.estado !== 'pendiente') {
                showAlert('❌ No puedes editar un invitado que ya fue procesado por el administrador', 'error');
                return;
            }

            // Llenar el formulario con los datos del invitado
            document.getElementById('nombre').value = invitado.nombre;
            document.getElementById('apellido').value = invitado.apellido;
            document.getElementById('dni').value = invitado.dni;
            document.getElementById('telefono').value = invitado.telefono;
            document.getElementById('fechaVisita').value = invitado.fecha_visita;
            document.getElementById('horaVisita').value = invitado.hora_visita;
            document.getElementById('permiso').value = invitado.permiso;
            document.getElementById('motivo').value = invitado.motivo;
            document.getElementById('observaciones').value = invitado.observaciones;

            // Cambiar el botón del formulario para modo edición
            const submitBtn = document.querySelector('#invitadoForm button[type="submit"]');
            submitBtn.innerHTML = '✏️ Actualizar Invitado';
            submitBtn.onclick = function(e) {
                e.preventDefault();
                actualizarInvitado(id);
            };

            // Scroll al formulario
            document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
            
            showAlert('📝 Modo edición activado. Modifica los datos y haz clic en "Actualizar Invitado"', 'success');
        };

        // Función para actualizar invitado
        function actualizarInvitado(id) {
            const formData = new FormData(invitadoForm);
            const datosActualizados = Object.fromEntries(formData);

            // Validaciones
            if (!validarDNI(datosActualizados.dni)) {
                showAlert('❌ El DNI debe tener entre 7 y 8 dígitos', 'error');
                return;
            }

            const fechaVisita = new Date(datosActualizados.fechaVisita);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            if (fechaVisita < hoy) {
                showAlert('❌ La fecha de visita no puede ser anterior a hoy', 'error');
                return;
            }

            // Preparar datos para actualización
            const updateData = {
                nombre: datosActualizados.nombre,
                apellido: datosActualizados.apellido,
                dni: datosActualizados.dni,
                telefono: datosActualizados.telefono || '',
                fecha_visita: datosActualizados.fechaVisita,
                hora_visita: datosActualizados.horaVisita || '',
                permiso: datosActualizados.permiso,
                motivo: datosActualizados.motivo || '',
                observaciones: datosActualizados.observaciones || ''
            };

            if (dbUsuario.updateInvitado(id, updateData)) {
                showAlert('✅ Invitado actualizado exitosamente', 'success');
                invitadoForm.reset();
                
                // Restaurar botón original
                const submitBtn = document.querySelector('#invitadoForm button[type="submit"]');
                submitBtn.innerHTML = '📝 Registrar Invitado';
                submitBtn.onclick = null;
                
                renderInvitadosTable();
                updateStats();
            } else {
                showAlert('❌ Error al actualizar el invitado', 'error');
            }
        }

        // Función para ver detalles del invitado
        window.verDetalles = function(id) {
            const invitados = dbUsuario.getInvitadosUsuario();
            const invitado = invitados.find(inv => inv.id_invitado === id);
            
            if (!invitado) {
                showAlert('❌ Invitado no encontrado', 'error');
                return;
            }

            const detalles = `
                <strong>Nombre:</strong> ${invitado.nombre} ${invitado.apellido}<br>
                <strong>DNI:</strong> ${invitado.dni}<br>
                <strong>Teléfono:</strong> ${invitado.telefono || 'No especificado'}<br>
                <strong>Fecha de visita:</strong> ${invitado.fecha_visita}<br>
                <strong>Hora:</strong> ${invitado.hora_visita || 'No especificada'}<br>
                <strong>Tipo de visita:</strong> ${invitado.permiso}<br>
                <strong>Motivo:</strong> ${invitado.motivo || 'No especificado'}<br>
                <strong>Estado:</strong> ${invitado.estado}<br>
                <strong>Observaciones:</strong> ${invitado.observaciones || 'Ninguna'}<br>
                <strong>Fecha de registro:</strong> ${invitado.fecha_creacion}
            `;

            // Crear modal simple con los detalles
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                    <div style="background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(15px); padding: 2rem; border-radius: 1rem; max-width: 500px; border: 1px solid rgba(255, 255, 255, 0.2);">
                        <h3 style="color: #ffffff; margin-bottom: 1rem; text-align: center;">📋 Detalles del Invitado</h3>
                        <div style="color: #f3f3f3; line-height: 1.6; margin-bottom: 1.5rem;">
                            ${detalles}
                        </div>
                        <button onclick="this.parentElement.parentElement.remove()" class="btn" style="width: 100%;">Cerrar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        };

        // Establecer fecha mínima como hoy
        document.getElementById('fechaVisita').min = new Date().toISOString().split('T')[0];

        // Formatear el campo DNI para que solo acepte números
        document.getElementById('dni').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        // Formatear el campo teléfono
        document.getElementById('telefono').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            updateUserInfo();
            renderInvitadosTable();
            updateStats();
        });

        // Manejo del menú hamburguesa
        document.getElementById('hamburger').addEventListener('click', function() {
            this.classList.toggle('active');
            // Aquí puedes agregar lógica para mostrar/ocultar el menú móvil
        });
    </script>
</body>
</html>