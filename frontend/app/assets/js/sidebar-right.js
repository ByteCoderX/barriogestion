
document.addEventListener('DOMContentLoaded', function() {
  
    const lotes = [
        { id: 1, numero: '101', propietario: 'Familia A', estado: 'al-dia' },
        { id: 2, numero: '102', propietario: 'Familia B', estado: 'mora' },
        { id: 3, numero: '103', propietario: 'Familia C', estado: 'al-dia' },
        { id: 4, numero: '104', propietario: 'Familia D', estado: 'al-dia' },
        { id: 5, numero: '105', propietario: 'Familia E', estado: 'al-dia' },
        { id: 6, numero: '106', propietario: 'Familia F', estado: 'mora' },
        { id: 7, numero: '107', propietario: 'Familia G', estado: 'al-dia' },
        { id: 8, numero: '108', propietario: 'Familia H', estado: 'al-dia' },
        { id: 9, numero: '109', propietario: 'Familia I', estado: 'al-dia' },
        { id: 10, numero: '110', propietario: 'Familia J', estado: 'mora' },
        { id: 11, numero: '111', propietario: 'Familia K', estado: 'al-dia' },
        { id: 12, numero: '112', propietario: 'Familia L', estado: 'al-dia' },
        { id: 13, numero: '113', propietario: 'Familia M', estado: 'mora' },
        { id: 14, numero: '114', propietario: 'Familia N', estado: 'al-dia' },
        { id: 15, numero: '115', propietario: 'Familia Ñ', estado: 'al-dia' }
    ];


    generarLotesEnSidebar(lotes);

    configurarBusqueda(lotes);
});

function generarLotesEnSidebar(lotes) {
    const lotesContainer = document.getElementById('lotes-container');
    
    lotesContainer.innerHTML = '';
    
    lotes.forEach(lote => {
        const loteItem = document.createElement('div');
        loteItem.className = 'lote-item';
        loteItem.dataset.id = lote.id;
        
        let iconName;
        let statusClass;
        
        switch(lote.estado) {
            default:
                iconName = 'hogar.png';
                statusClass = '';
        }
        
        loteItem.innerHTML = `
            <img src="./assets/icons/${iconName}" alt="${lote.estado}">
            <div class="lote-info">
                <div class="lote-numero ${statusClass}">Lote ${lote.numero}</div>
                <div class="lote-propietario">${lote.propietario}</div>
            </div>
        `;
        
        loteItem.addEventListener('click', function() {
            document.querySelectorAll('.lote-item').forEach(item => {
                item.classList.remove('active');
            });
            
            this.classList.add('active');

            mostrarInformacionLote(lote.id);
        });

        lotesContainer.appendChild(loteItem);
    });
}

function configurarBusqueda(lotes) {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        
        const lotesFiltrados = lotes.filter(lote => {
            return lote.numero.toLowerCase().includes(searchText) || 
                   lote.propietario.toLowerCase().includes(searchText);
        });
        
        generarLotesEnSidebar(lotesFiltrados);
    });
}

function mostrarInformacionLote(loteId) {

    const loteInfo = obtenerInformacionLote(loteId);

    const mainContainer = document.getElementById('main');

    let loteDetailContainer = document.getElementById('lote-detail-container');
    
    if (!loteDetailContainer) {
        loteDetailContainer = document.createElement('div');
        loteDetailContainer.id = 'lote-detail-container';
        mainContainer.appendChild(loteDetailContainer);
    }
    
    loteDetailContainer.innerHTML = `
        <div class="lote-detail-header">
            <div class="back-button" onclick="mostrarContenidoPrincipal()">
                <img src="./assets/icons/volver.png" alt="Volver">
                <span>Volver al Dashboard</span>
            </div>
            <h1>Lote ${loteInfo.numero}</h1>
            <div class="lote-status ${loteInfo.estado.replace('í', 'i')}">${getEstadoTexto(loteInfo.estado)}</div>
        </div>
        
        <div class="lote-info-grid">
            <div class="lote-info-card">
                <h2>Información del Propietario</h2>
                <div class="info-group">
                    <div class="info-label">Propietario:</div>
                    <div class="info-value">${loteInfo.propietario}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${loteInfo.email}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Teléfono:</div>
                    <div class="info-value">${loteInfo.telefono}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Residentes:</div>
                    <div class="info-value">${loteInfo.cantidadResidentes}</div>
                </div>
            </div>
            
            <div class="lote-info-card">
                <h2>Estado Financiero</h2>
                <div class="info-group">
                    <div class="info-label">Saldo Actual:</div>
                    <div class="info-value ${loteInfo.saldo < 0 ? 'negative' : 'positive'}">
                        ${formatCurrency(loteInfo.saldo)}
                    </div>
                </div>
                <div class="info-group">
                    <div class="info-label">Último Pago:</div>
                    <div class="info-value">${loteInfo.ultimoPago.fecha} - ${formatCurrency(loteInfo.ultimoPago.monto)}</div>
                </div>
                <div class="info-group">
                    <div class="info-label">Expensas Mensuales:</div>
                    <div class="info-value">${formatCurrency(loteInfo.expensasMensuales)}</div>
                </div>
            </div>
            
            <div class="lote-info-card">
                <h2>Historial de Pagos</h2>
                <div class="payment-history">
                    ${generarHistorialPagos(loteInfo.historialPagos)}
                </div>
            </div>
            
            <div class="lote-info-card">
                <h2>Acciones Rápidas</h2>
                <div class="quick-actions">
                    <button class="action-button registrar-pago">Registrar Pago</button>
                    <button class="action-button generar-expensa">Generar Expensa</button>
                    <button class="action-button enviar-notificacion">Enviar Notificación</button>
                    <button class="action-button ver-documentos">Ver Documentos</button>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('.dashboard-container').style.display = 'none';
    
    loteDetailContainer.style.display = 'block';
    
    configurarBotonesAccion();
}

function mostrarContenidoPrincipal() {
    const loteDetailContainer = document.getElementById('lote-detail-container');
    if (loteDetailContainer) {
        loteDetailContainer.style.display = 'none';
    }

    document.querySelector('.dashboard-container').style.display = 'block';
}

function obtenerInformacionLote(loteId) {

    const loteBase = {
        id: loteId,
        numero: loteId + 100,
        propietario: `Familia ${['González', 'Rodríguez', 'Martínez', 'López', 'Pérez'][loteId % 5]}`,
        email: `familia${loteId + 100}@ejemplo.com`,
        telefono: `+54 11 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        cantidadResidentes: Math.floor(2 + Math.random() * 4),
    };
    
    if (loteId % 5 === 0) {
        loteBase.estado = 'vacío';
        loteBase.saldo = 0;
    } else if (loteId % 3 === 0) {
        loteBase.estado = 'mora';
        loteBase.saldo = -Math.floor(15000 + Math.random() * 50000);
    } else {
        loteBase.estado = 'al-dia';
        loteBase.saldo = Math.floor(Math.random() * 10000) - 2000;
    }
    
    loteBase.expensasMensuales = 15000 + (loteId % 3) * 5000;
    
    const hoy = new Date();
    const ultimoPagoFecha = new Date(hoy);
    ultimoPagoFecha.setDate(hoy.getDate() - (loteId % 30));
    
    loteBase.ultimoPago = {
        fecha: ultimoPagoFecha.toLocaleDateString('es-AR'),
        monto: loteBase.expensasMensuales
    };
    
    loteBase.historialPagos = [];
   
    for (let i = 0; i < 6; i++) {
        const fechaPago = new Date(hoy);
        fechaPago.setMonth(hoy.getMonth() - i);
        
        const pago = {
            fecha: fechaPago.toLocaleDateString('es-AR'),
            monto: loteBase.expensasMensuales,
            estado: i === 0 && loteBase.estado === 'mora' ? 'Pendiente' : 'Pagado'
        };
        
        loteBase.historialPagos.push(pago);
    }
    
    return loteBase;
}

function generarHistorialPagos(pagos) {
    if (!pagos || pagos.length === 0) {
        return '<div class="no-data">No hay pagos registrados</div>';
    }
    
    let html = '<table class="payments-table">';
    html += '<thead><tr><th>Fecha</th><th>Monto</th><th>Estado</th></tr></thead>';
    html += '<tbody>';
    
    pagos.forEach(pago => {
        const estadoClass = pago.estado === 'Pagado' ? 'estado-pagado' : 'estado-pendiente';
        
        html += `
            <tr>
                <td>${pago.fecha}</td>
                <td>${formatCurrency(pago.monto)}</td>
                <td><span class="${estadoClass}">${pago.estado}</span></td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    
    return html;
}

function configurarBotonesAccion() {

    
    const registrarPagoBtn = document.querySelector('.registrar-pago');
    if (registrarPagoBtn) {
        registrarPagoBtn.addEventListener('click', function() {
            alert('Funcionalidad para registrar pago en desarrollo');
        });
    }

}

function formatCurrency(amount) {
    return '$ ' + amount.toLocaleString('es-AR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

function getEstadoTexto(estado) {
    switch (estado) {
        case 'al-dia':
            return 'Al día';
        case 'mora':
            return 'En mora';
        case 'vacío':
            return 'Lote vacío';
        default:
            return estado;
    }
}

window.mostrarContenidoPrincipal = mostrarContenidoPrincipal;