// Variables globales para temas
let currentTheme = localStorage.getItem('theme') || 'dark';

// Datos de ejemplo para el historial
const historialData = {
    '2025-07': {
        periodo: 'Julio 2025',
        fechaEmision: '01/07/2025',
        fechaVencimiento: '10/07/2025',
        monto: '$125.000',
        estado: 'PENDIENTE',
        fechaPago: null,
        metodoPago: null,
        numeroTransaccion: null
    },
    '2025-06': {
        periodo: 'Junio 2025',
        fechaEmision: '01/06/2025',
        fechaVencimiento: '10/06/2025',
        monto: '$118.500',
        estado: 'PAGADA',
        fechaPago: '08/06/2025',
        metodoPago: 'Transferencia',
        numeroTransaccion: 'TXN-20250608-001'
    },
    '2025-05': {
        periodo: 'Mayo 2025',
        fechaEmision: '01/05/2025',
        fechaVencimiento: '10/05/2025',
        monto: '$115.200',
        estado: 'PAGADA',
        fechaPago: '09/05/2025',
        metodoPago: 'Debito Automático',
        numeroTransaccion: 'TXN-20250509-001'
    },
    '2025-04': {
        periodo: 'Abril 2025',
        fechaEmision: '01/04/2025',
        fechaVencimiento: '10/04/2025',
        monto: '$112.800',
        estado: 'PAGADA',
        fechaPago: '07/04/2025',
        metodoPago: 'Transferencia',
        numeroTransaccion: 'TXN-20250407-001'
    },
    '2025-03': {
        periodo: 'Marzo 2025',
        fechaEmision: '01/03/2025',
        fechaVencimiento: '10/03/2025',
        monto: '$110.500',
        estado: 'PAGADA',
        fechaPago: '08/03/2025',
        metodoPago: 'Efectivo',
        numeroTransaccion: 'REC-20250308-001'
    },
    '2025-02': {
        periodo: 'Febrero 2025',
        fechaEmision: '01/02/2025',
        fechaVencimiento: '10/02/2025',
        monto: '$108.200',
        estado: 'PAGADA',
        fechaPago: '06/02/2025',
        metodoPago: 'Transferencia',
        numeroTransaccion: 'TXN-20250206-001'
    }
};

// Variable para la paginación
let paginaActual = 1;
const registrosPorPagina = 6;

// Variables para filtros
let historialFiltrado = { ...historialData };

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema guardado
    applyTheme(currentTheme);
    
    // Configurar menú móvil
    setupMobileMenu();
    
    // Inicializar historial
    inicializarHistorial();
    configurarEventListeners();
});

// Funciones para el selector de tema
function setTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
}

function applyTheme(theme) {
    const body = document.body;
    
    // Remover todas las clases de tema
    body.classList.remove('theme-dark', 'theme-light', 'theme-nature');
    
    // Aplicar el tema seleccionado
    if (theme === 'light') {
        body.classList.add('theme-light');
    } else if (theme === 'nature') {
        body.classList.add('theme-nature');
    }
    // El tema oscuro no necesita clase adicional (es el por defecto)
}

function toggleThemeMenu() {
    // Esta función puede ser usada si quieres controlar el menú por JavaScript
    // Por ahora el menú se controla con CSS hover
}

// Configurar menú móvil
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            if (mobileMenu) mobileMenu.classList.toggle('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = (mobileMenu && mobileMenu.classList.contains('active')) ? 'hidden' : 'auto';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
}

function inicializarHistorial() {
    actualizarEstadisticas();
    renderizarTabla();
    actualizarPaginacion();
}

function configurarEventListeners() {
    // Botones de filtros
    const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');
    const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');
    const btnExportarExcel = document.getElementById('btnExportarExcel');
    const btnExportarPDF = document.getElementById('btnExportarPDF');

    if (btnAplicarFiltros) {
        btnAplicarFiltros.addEventListener('click', function(e) {
            e.preventDefault();
            aplicarFiltros();
        });
    }
    
    if (btnLimpiarFiltros) {
        btnLimpiarFiltros.addEventListener('click', function(e) {
            e.preventDefault();
            limpiarFiltros();
        });
    }
    
    if (btnExportarExcel) {
        btnExportarExcel.addEventListener('click', function(e) {
            e.preventDefault();
            exportarExcel();
        });
    }
    
    if (btnExportarPDF) {
        btnExportarPDF.addEventListener('click', function(e) {
            e.preventDefault();
            exportarPDF();
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modalDetalle');
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Configurar botones de paginación
    configurarPaginacion();
}

function configurarPaginacion() {
    const paginacionBtns = document.querySelectorAll('.paginacion-btn');
    
    paginacionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('disabled')) {
                return;
            }
            
            const texto = this.textContent.trim();
            const totalRegistros = Object.keys(historialFiltrado).length;
            const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
            const paginasReales = totalPaginas > 0 ? totalPaginas : 1;
            
            if (texto === '« Anterior') {
                if (paginaActual > 1) {
                    paginaActual--;
                    renderizarTabla();
                    actualizarPaginacion();
                }
            } else if (texto === 'Siguiente »') {
                if (paginaActual < paginasReales) {
                    paginaActual++;
                    renderizarTabla();
                    actualizarPaginacion();
                }
            } else if (!isNaN(texto)) {
                const numeroPagina = parseInt(texto);
                // Solo cambiar si es una página válida
                if (numeroPagina <= paginasReales) {
                    paginaActual = numeroPagina;
                    renderizarTabla();
                    actualizarPaginacion();
                }
            }
        });
    });
}

function actualizarPaginacion() {
    const totalRegistros = Object.keys(historialFiltrado).length;
    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
    
    // Si no hay registros, mostrar información de página vacía
    const paginasReales = totalPaginas > 0 ? totalPaginas : 1;
    
    // Actualizar información de paginación
    const paginacionInfo = document.querySelector('.paginacion-info');
    if (paginacionInfo) {
        if (totalRegistros === 0) {
            paginacionInfo.textContent = 'Mostrando 0 de 0 registros';
        } else {
            const inicio = (paginaActual - 1) * registrosPorPagina + 1;
            const fin = Math.min(paginaActual * registrosPorPagina, totalRegistros);
            paginacionInfo.textContent = `Mostrando ${inicio} a ${fin} de ${totalRegistros} registros`;
        }
    }
    
    // Actualizar botones de paginación
    const paginacionBtns = document.querySelectorAll('.paginacion-btn');
    paginacionBtns.forEach(btn => {
        const texto = btn.textContent.trim();
        
        // Botón anterior: deshabilitado si estamos en página 1
        if (texto === '« Anterior') {
            if (paginaActual <= 1) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        }
        
        // Botón siguiente: deshabilitado si estamos en la última página O si solo hay 1 página
        if (texto === 'Siguiente »') {
            if (paginaActual >= paginasReales || paginasReales === 1) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        }
        
        // Botones numéricos: marcar el activo
        if (!isNaN(texto)) {
            const numeroPagina = parseInt(texto);
            if (numeroPagina === paginaActual) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            
            // Mostrar visualmente qué páginas son válidas
            if (numeroPagina > paginasReales) {
                btn.style.opacity = '0.5';
            } else {
                btn.style.opacity = '1';
            }
        }
    });
}

function aplicarFiltros() {
    const ano = document.getElementById('filtroAno')?.value || '';
    const mes = document.getElementById('filtroMes')?.value || '';
    const estado = document.getElementById('filtroEstado')?.value || '';
    const montoMin = document.getElementById('filtroMontoMin')?.value || '';

    console.log('Aplicando filtros:', { ano, mes, estado, montoMin });
    
    // Resetear filtrado
    historialFiltrado = {};
    
    // Aplicar filtros
    Object.keys(historialData).forEach(key => {
        const registro = historialData[key];
        let cumpleFiltros = true;
        
        // Filtro por año
        if (ano && !key.startsWith(ano)) {
            cumpleFiltros = false;
        }
        
        // Filtro por mes
        if (mes) {
            const mesRegistro = key.split('-')[1];
            if (mesRegistro !== mes) {
                cumpleFiltros = false;
            }
        }
        
        // Filtro por estado
        if (estado && registro.estado.toLowerCase() !== estado.toLowerCase()) {
            cumpleFiltros = false;
        }
        
        // Filtro por monto mínimo
        if (montoMin) {
            const montoRegistro = parseFloat(registro.monto.replace(/[$.]/g, ''));
            const montoMinimo = parseFloat(montoMin);
            if (montoRegistro < montoMinimo) {
                cumpleFiltros = false;
            }
        }
        
        if (cumpleFiltros) {
            historialFiltrado[key] = registro;
        }
    });
    
    // Resetear a la primera página
    paginaActual = 1;
    
    // Actualizar tabla y paginación
    renderizarTabla();
    actualizarPaginacion();
    
    // Mostrar mensaje
    let filtrosAplicados = [];
    if (ano) filtrosAplicados.push(`Año: ${ano}`);
    if (mes) {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        filtrosAplicados.push(`Mes: ${meses[parseInt(mes) - 1]}`);
    }
    if (estado) filtrosAplicados.push(`Estado: ${estado}`);
    if (montoMin) filtrosAplicados.push(`Monto mínimo: ${montoMin}`);
    
    const registrosEncontrados = Object.keys(historialFiltrado).length;
    
    if (filtrosAplicados.length > 0) {
        showAlert(`Filtros aplicados: ${filtrosAplicados.join(', ')}. Encontrados: ${registrosEncontrados} registros`, 'success');
    } else {
        showAlert('No hay filtros para aplicar', 'info');
    }
}

function limpiarFiltros() {
    const filtroAno = document.getElementById('filtroAno');
    const filtroMes = document.getElementById('filtroMes');
    const filtroEstado = document.getElementById('filtroEstado');
    const filtroMontoMin = document.getElementById('filtroMontoMin');

    if (filtroAno) filtroAno.value = '';
    if (filtroMes) filtroMes.value = '';
    if (filtroEstado) filtroEstado.value = '';
    if (filtroMontoMin) filtroMontoMin.value = '';
    
    // Restaurar todos los datos
    historialFiltrado = { ...historialData };
    paginaActual = 1;
    
    // Actualizar tabla y paginación
    renderizarTabla();
    actualizarPaginacion();
    
    showAlert('Filtros limpiados correctamente', 'success');
}

function verDetalle(periodo) {
    const datos = historialData[periodo];
    if (!datos) return;

    // Llenar datos en el modal
    const detallePeriodo = document.getElementById('detallePeriodo');
    const detalleFechaEmision = document.getElementById('detalleFechaEmision');
    const detalleFechaVencimiento = document.getElementById('detalleFechaVencimiento');
    const detalleMontoTotal = document.getElementById('detalleMontoTotal');

    if (detallePeriodo) detallePeriodo.textContent = datos.periodo;
    if (detalleFechaEmision) detalleFechaEmision.textContent = datos.fechaEmision;
    if (detalleFechaVencimiento) detalleFechaVencimiento.textContent = datos.fechaVencimiento;
    if (detalleMontoTotal) detalleMontoTotal.innerHTML = `<strong>${datos.monto}</strong>`;

    // Estado con estilo
    const estadoElement = document.getElementById('detalleEstado');
    if (estadoElement) {
        estadoElement.innerHTML = `<span class="estado-badge ${datos.estado.toLowerCase()}">${datos.estado}</span>`;
    }

    // Mostrar información de pago si está pagada
    const grupoPago = document.getElementById('grupoPago');
    if (datos.estado === 'PAGADA' && grupoPago) {
        const detalleFechaPago = document.getElementById('detalleFechaPago');
        const detalleMetodoPago = document.getElementById('detalleMetodoPago');
        const detalleNumeroTransaccion = document.getElementById('detalleNumeroTransaccion');

        if (detalleFechaPago) detalleFechaPago.textContent = datos.fechaPago || '-';
        if (detalleMetodoPago) detalleMetodoPago.textContent = datos.metodoPago || '-';
        if (detalleNumeroTransaccion) detalleNumeroTransaccion.textContent = datos.numeroTransaccion || '-';
        grupoPago.style.display = 'block';
    } else if (grupoPago) {
        grupoPago.style.display = 'none';
    }

    // Mostrar modal
    const modal = document.getElementById('modalDetalle');
    if (modal) modal.style.display = 'block';
}

function cerrarModal() {
    const modal = document.getElementById('modalDetalle');
    if (modal) modal.style.display = 'none';
}

function descargarComprobante(periodo) {
    const datos = historialData[periodo];
    if (!datos) {
        showAlert('No se encontró el comprobante', 'error');
        return;
    }

    showAlert(`Generando PDF de ${datos.periodo}...`, 'info');
    
    setTimeout(() => {
        // Generar contenido del PDF
        let pdfContent = '╔════════════════════════════════════════════════╗\n';
        pdfContent += '║        COMPROBANTE DE EXPENSA                  ║\n';
        pdfContent += '║        Barrio Gestión                          ║\n';
        pdfContent += '╚════════════════════════════════════════════════╝\n\n';
        
        pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        pdfContent += '  INFORMACIÓN GENERAL\n';
        pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        
        pdfContent += `Período:              ${datos.periodo}\n`;
        pdfContent += `Fecha de Emisión:     ${datos.fechaEmision}\n`;
        pdfContent += `Fecha de Vencimiento: ${datos.fechaVencimiento}\n`;
        pdfContent += `Estado:               ${datos.estado}\n\n`;
        
        pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        pdfContent += '  DETALLE DE CONCEPTOS\n';
        pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
        
        pdfContent += 'Expensas Ordinarias:     $ 85.000\n';
        pdfContent += 'Expensas Extraordinarias: $ 15.000\n';
        pdfContent += 'Fondo de Reserva:        $ 12.000\n';
        pdfContent += 'Servicios:               $  8.000\n';
        pdfContent += 'Intereses:               $     0\n';
        pdfContent += '─────────────────────────────────────────────────\n';
        pdfContent += `TOTAL:                   ${datos.monto}\n\n`;
        
        if (datos.estado === 'PAGADA') {
            pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            pdfContent += '  INFORMACIÓN DE PAGO\n';
            pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
            pdfContent += `Fecha de Pago:        ${datos.fechaPago}\n`;
            pdfContent += `Método de Pago:       ${datos.metodoPago}\n`;
            pdfContent += `Número de Transacción: ${datos.numeroTransaccion}\n\n`;
            pdfContent += '✓ PAGO CONFIRMADO\n\n';
        } else {
            pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            pdfContent += '  IMPORTANTE\n';
            pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
            pdfContent += 'Esta expensa se encuentra PENDIENTE de pago.\n';
            pdfContent += `Fecha límite: ${datos.fechaVencimiento}\n\n`;
        }
        
        pdfContent += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        pdfContent += 'Documento generado el: ' + new Date().toLocaleString('es-AR') + '\n';
        pdfContent += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
        
        // Crear y descargar el archivo
        const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `Comprobante_${periodo}_${datos.periodo.replace(' ', '_')}.txt`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showAlert(`Comprobante de ${datos.periodo} descargado correctamente`, 'success');
    }, 1500);
}

function exportarExcel() {
    showAlert('Generando archivo Excel...', 'info');
    
    setTimeout(() => {
        // Simulación de exportación a Excel
        const datos = Object.values(historialData);
        let csvContent = "Período,Fecha Emisión,Fecha Vencimiento,Monto,Estado,Fecha Pago,Método Pago\n";
        
        datos.forEach(row => {
            csvContent += `${row.periodo},${row.fechaEmision},${row.fechaVencimiento},${row.monto},${row.estado},${row.fechaPago || '-'},${row.metodoPago || '-'}\n`;
        });
        
        // Crear enlace de descarga
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'historial_expensas.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showAlert('Archivo Excel exportado correctamente', 'success');
    }, 1000);
}

function exportarPDF() {
    showAlert('Generando archivo PDF...', 'info');
    
    setTimeout(() => {
        // Simulación de exportación a PDF
        const datos = Object.values(historialData);
        let pdfContent = 'HISTORIAL DE EXPENSAS\n\n';
        
        datos.forEach(row => {
            pdfContent += `Período: ${row.periodo}\n`;
            pdfContent += `Fecha Emisión: ${row.fechaEmision}\n`;
            pdfContent += `Fecha Vencimiento: ${row.fechaVencimiento}\n`;
            pdfContent += `Monto: ${row.monto}\n`;
            pdfContent += `Estado: ${row.estado}\n`;
            if (row.fechaPago) pdfContent += `Fecha Pago: ${row.fechaPago}\n`;
            if (row.metodoPago) pdfContent += `Método Pago: ${row.metodoPago}\n`;
            pdfContent += '\n---\n\n';
        });
        
        // Crear enlace de descarga
        const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'historial_expensas.txt');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showAlert('Archivo PDF generado correctamente', 'success');
    }, 1500);
}

function actualizarEstadisticas() {
    // Las estadísticas mostradas son de ejemplo
    console.log('Estadísticas actualizadas');
}

// Función para renderizar la tabla con los datos filtrados
function renderizarTabla() {
    const tbody = document.getElementById('tablaHistorial');
    if (!tbody) return;
    
    // Limpiar tabla
    tbody.innerHTML = '';
    
    // Obtener datos de la página actual
    const registros = Object.entries(historialFiltrado);
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;
    const registrosPagina = registros.slice(inicio, fin);
    
    if (registrosPagina.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.6);">
                    No se encontraron registros con los filtros aplicados
                </td>
            </tr>
        `;
        return;
    }
    
    // Renderizar filas
    registrosPagina.forEach(([key, datos]) => {
        const tr = document.createElement('tr');
        
        const estadoClass = datos.estado.toLowerCase();
        const mostrarAcciones = datos.estado === 'PAGADA' 
            ? `<button class="btn-accion btn-ver" onclick="verDetalle('${key}')">Ver</button>
               <button class="btn-accion btn-descargar" onclick="descargarComprobante('${key}')">PDF</button>`
            : `<button class="btn-accion btn-ver" onclick="verDetalle('${key}')">Ver</button>`;
        
        tr.innerHTML = `
            <td>${datos.periodo}</td>
            <td>${datos.fechaEmision}</td>
            <td>${datos.fechaVencimiento}</td>
            <td>${datos.monto}</td>
            <td><span class="estado-badge ${estadoClass}">${datos.estado}</span></td>
            <td>${datos.fechaPago || '-'}</td>
            <td>${datos.metodoPago || '-'}</td>
            <td>
                <div class="acciones-fila">
                    ${mostrarAcciones}
                </div>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Mostrar alerta
function showAlert(message, type = 'info') {
    // Remover alertas existentes
    const existingAlerts = document.querySelectorAll('.temp-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Crear nueva alerta
    const alert = document.createElement('div');
    alert.className = `temp-alert alert alert-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;

    const colores = {
        'success': 'background: linear-gradient(135deg, #4CAF50, #45a049);',
        'error': 'background: linear-gradient(135deg, #f44336, #da190b);',
        'info': 'background: linear-gradient(135deg, #2196F3, #1976D2);'
    };

    alert.style.cssText += colores[type] || colores['info'];

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-alerts]')) {
        style.setAttribute('data-alerts', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 4000);
}

// Manejo de teclado para accesibilidad
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('modalDetalle');
        if (modal && modal.style.display === 'block') {
            cerrarModal();
        }
    }
});