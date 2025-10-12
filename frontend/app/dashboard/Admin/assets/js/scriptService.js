// Datos de reservas y disponibilidad
const reservationData = {
    amenities: {
        'cancha-tenis-1': { name: 'Cancha de Tenis #1', available: true },
        'cancha-tenis-2': { name: 'Cancha de Tenis #2', available: true },
        'cancha-tenis-3': { name: 'Cancha de Tenis #3', available: true },
        'cancha-tenis-4': { name: 'Cancha de Tenis #4', available: true },
        'cancha-poli': { name: 'Cancha Polideportiva', available: true },
        'house': { name: 'House', available: true },
        'mesas-quincho': { name: 'Mesas Quincho', available: true },
        'metegol-playroom': { name: 'Metegol - Playroom', available: true },
        'cancha-1': { name: 'N° 1 - Cancha de Fútbol', available: true },
        'cancha-2': { name: 'N° 2 - Cancha de Fútbol', available: true },
        'cancha-3': { name: 'N° 3 - Cancha de Fútbol', available: true },
        'cancha-4': { name: 'N° 4 - Cancha de Fútbol', available: true },
        'cancha-5': { name: 'N° 5 - Cancha de Fútbol', available: true },
        'ping-pong': { name: 'Ping Pong - Playroom', available: true },
        'pool': { name: 'Pool - Playroom', available: true },
        'quincho-1': { name: 'Quincho Mesa Nº 1', available: true },
        'quincho-2': { name: 'Quincho Mesa Nº 2', available: true },
        'quincho-3': { name: 'Quincho Mesa Nº 3', available: true },
        'quincho-4': { name: 'Quincho Mesa Nº 4', available: true }
    },
    
    // Simulación de reservas existentes (fecha: [horas ocupadas])
    occupiedSlots: {
        '2025-08-24': {
            'cancha-tenis-1': ['10:00', '11:00', '15:00'],
            'quincho-1': ['19:00', '20:00'],
            'piscina': ['14:00', '15:00', '16:00']
        },
        '2025-08-25': {
            'cancha-padel': ['09:00', '10:00'],
            'salon-eventos': ['18:00', '19:00', '20:00']
        },
        '2025-08-26': {
            'cancha-tenis-1': ['16:00', '17:00'],
            'playground': ['10:00', '11:00', '12:00']
        }
    }
};

// Variables globales
let currentDate = new Date();
let selectedDate = null;
let selectedAmenity = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    generateAmenityCards();
    initializeAmenityCards();
    initializeForm();
    setupEventListeners();
    // Establecer fecha mínima para el input de fecha
    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.min = today;
    updateAmenityFieldVisibility();
});

// Oculta o muestra el campo de tipo de espacio en el formulario
function updateAmenityFieldVisibility() {
    const amenityGroup = document.querySelector('.form-group:has(#amenity)');
    if (amenityGroup) {
        if (selectedAmenity) {
            amenityGroup.style.display = 'none';
            // Actualizar el valor del select oculto
            document.getElementById('amenity').value = selectedAmenity;
            // Mostrar información del amenity seleccionado
            showSelectedAmenityInfo();
        } else {
            amenityGroup.style.display = '';
            hideSelectedAmenityInfo();
        }
    }
}

// Mostrar información del amenity seleccionado
function showSelectedAmenityInfo() {
    let infoElement = document.getElementById('selected-amenity-info');
    
    if (!infoElement) {
        infoElement = document.createElement('div');
        infoElement.id = 'selected-amenity-info';
        infoElement.className = 'selected-amenity-info';
        
        // Insertar después del campo de lote
        const loteGroup = document.querySelector('.form-group:has(#lote)');
        loteGroup.insertAdjacentElement('afterend', infoElement);
    }
    
    if (selectedAmenity && reservationData.amenities[selectedAmenity]) {
        infoElement.innerHTML = `
            <div class="selected-amenity-card">
                <i class="fas fa-check-circle"></i>
                <div class="amenity-details">
                    <h4>Espacio Seleccionado</h4>
                    <p><strong>${reservationData.amenities[selectedAmenity].name}</strong></p>
                    <button type="button" class="btn-change" onclick="clearSelectedAmenity()">
                        <i class="fas fa-edit"></i> Cambiar Espacio
                    </button>
                </div>
            </div>
        `;
        infoElement.style.display = 'block';
    }
}

// Ocultar información del amenity seleccionado
function hideSelectedAmenityInfo() {
    const infoElement = document.getElementById('selected-amenity-info');
    if (infoElement) {
        infoElement.style.display = 'none';
    }
}

// Limpiar selección de amenity
function clearSelectedAmenity() {
    selectedAmenity = null;
    document.getElementById('amenity').value = '';
    
    // Quitar selección visual de todas las tarjetas
    document.querySelectorAll('.amenity-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    updateAmenityFieldVisibility();
    updateCalendar();
    updateAvailableHours();
    
    showNotification('Selección de espacio limpiada. Puedes elegir otro espacio.', 'info');
}

// Generar dinámicamente las tarjetas de amenities
function generateAmenityCards() {
    const amenitiesGrid = document.querySelector('.amenities-grid');
    if (!amenitiesGrid) return;
    amenitiesGrid.innerHTML = '';
    Object.entries(reservationData.amenities).forEach(([amenityId, amenity]) => {
        // Determinar estado visual
        let cardClass = 'amenity-card';
        let statusClass = 'status available';
        let statusText = 'Disponible';
        if (amenity.available === false) {
            cardClass += ' no-reserve';
            statusClass = 'status no-reserve';
            statusText = 'No disponible';
        }
        // Se puede agregar lógica para ocupado si se desea
        // Icono por tipo (puedes personalizar más)
        let icon = '<i class="fas fa-building"></i>';
        if (amenityId.includes('tenis')) icon = '<i class="fas fa-table-tennis"></i>';
        else if (amenityId.includes('padel')) icon = '<i class="fas fa-table-tennis-paddle-ball"></i>';
        else if (amenityId.includes('quincho')) icon = '<i class="fas fa-utensils"></i>';
        else if (amenityId.includes('piscina')) icon = '<i class="fas fa-swimming-pool"></i>';
        else if (amenityId.includes('salon')) icon = '<i class="fas fa-glass-cheers"></i>';
        else if (amenityId.includes('playground')) icon = '<i class="fas fa-child"></i>';

        const card = document.createElement('div');
        card.className = cardClass + (amenity.available ? ' available' : '');
        card.dataset.amenity = amenityId;
        card.innerHTML = `
            <div class="amenity-icon">${icon}</div>
            <div class="amenity-info">
                <h3>${amenity.name}</h3>
                <span class="${statusClass}">${statusText}</span>
            </div>
        `;
        amenitiesGrid.appendChild(card);
    });
}

// Configuración de event listeners
function setupEventListeners() {
    // Navegación del calendario
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    // Formulario
    document.getElementById('reservationForm').addEventListener('submit', handleFormSubmit);
    // Sincronización entre selector de amenity y input de fecha
    document.getElementById('amenity').addEventListener('change', function() {
        // Solo actualizar si no hay un amenity seleccionado desde las tarjetas
        if (!selectedAmenity) {
            selectedAmenity = this.value;
        }
        updateCalendar();
        updateAvailableHours();
        updateAmenityFieldVisibility();
    });
    document.getElementById('fecha').addEventListener('change', function() {
        const dateValue = this.value;
        if (dateValue) {
            selectedDate = dateValue;
            highlightCalendarDate();
            updateAvailableHours();
        }
    });
    // Validación en tiempo real
    setupRealTimeValidation();
}

// Inicialización del calendario
function initializeCalendar() {
    updateCalendar();
}

function updateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    // Actualizar título del mes
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Limpiar calendario
    calendarGrid.innerHTML = '';
    
    // Agregar encabezados de días
    const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayHeaders.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day header';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Calcular primer día del mes y número de días
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Agregar días del mes anterior
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const dayElement = createCalendarDay(prevMonthLastDay - i, 'other-month');
        calendarGrid.appendChild(dayElement);
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createCalendarDay(day, 'current-month');
        calendarGrid.appendChild(dayElement);
    }
    
    // Agregar días del mes siguiente
    const totalCells = calendarGrid.children.length - 7; // Restar headers
    const remainingCells = 35 - totalCells; // 5 filas × 7 días - headers
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = createCalendarDay(day, 'other-month');
        calendarGrid.appendChild(dayElement);
    }
}

function createCalendarDay(day, monthType) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    if (monthType === 'other-month') {
        dayElement.classList.add('other-month');
        return dayElement;
    }
    
    // Determinar disponibilidad
    const dateStr = formatDateForComparison(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // No permitir fechas pasadas
    if (dayDate < today) {
        dayElement.classList.add('occupied');
        return dayElement;
    }
    
    // Verificar disponibilidad basada en amenity seleccionado
    if (selectedAmenity && reservationData.occupiedSlots[dateStr] && 
        reservationData.occupiedSlots[dateStr][selectedAmenity]) {
        const occupiedHours = reservationData.occupiedSlots[dateStr][selectedAmenity];
        const availableHours = getAvailableHoursForDate(dateStr, selectedAmenity);
        
        if (availableHours.length === 0) {
            dayElement.classList.add('occupied');
        } else {
            dayElement.classList.add('available');
        }
    } else {
        dayElement.classList.add('available');
    }
    
    // Marcar día seleccionado
    if (selectedDate === dateStr) {
        dayElement.classList.add('selected');
    }
    
    // Event listener para selección
    dayElement.addEventListener('click', () => {
        if (dayElement.classList.contains('available')) {
            selectedDate = dateStr;
            document.getElementById('fecha').value = dateStr;
            updateCalendar();
            updateAvailableHours();
        }
    });
    
    return dayElement;
}

function formatDateForComparison(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function highlightCalendarDate() {
    updateCalendar();
}

// Inicialización de las tarjetas de amenities
function initializeAmenityCards() {
    const amenityCards = document.querySelectorAll('.amenity-card');
    amenityCards.forEach(card => {
        const amenityId = card.dataset.amenity;
        card.addEventListener('click', () => {
            if (card.classList.contains('available')) {
                // Limpiar selecciones anteriores
                amenityCards.forEach(c => c.classList.remove('selected'));
                
                // Seleccionar nueva tarjeta
                selectedAmenity = amenityId;
                card.classList.add('selected');
                
                // Actualizar formulario y calendario
                updateCalendar();
                updateAvailableHours();
                updateAmenityFieldVisibility();
                
                // Efecto visual
                card.classList.add('pulse');
                setTimeout(() => {
                    card.classList.remove('pulse');
                }, 2000);
                
                showNotification(`Espacio seleccionado: ${reservationData.amenities[amenityId].name}`, 'info');
            }
        });
    });
}

// Actualización de horas disponibles
function updateAvailableHours() {
    const horaSelect = document.getElementById('hora');
    
    if (!selectedDate || !selectedAmenity) {
        return;
    }
    
    const availableHours = getAvailableHoursForDate(selectedDate, selectedAmenity);
    
    // Limpiar opciones existentes (excepto la primera)
    while (horaSelect.children.length > 1) {
        horaSelect.removeChild(horaSelect.lastChild);
    }
    
    // Agregar horas disponibles
    availableHours.forEach(hour => {
        const option = document.createElement('option');
        option.value = hour;
        option.textContent = hour;
        horaSelect.appendChild(option);
    });
    
    // Mostrar mensaje si no hay horas disponibles
    if (availableHours.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No hay horarios disponibles';
        option.disabled = true;
        horaSelect.appendChild(option);
    }
}

function getAvailableHoursForDate(date, amenity) {
    const allHours = [
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
        '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ];
    
    const occupiedHours = (reservationData.occupiedSlots[date] && 
                          reservationData.occupiedSlots[date][amenity]) || [];
    
    return allHours.filter(hour => !occupiedHours.includes(hour));
}

// Inicialización del formulario
function initializeForm() {
    // Configurar validación personalizada
    const form = document.getElementById('reservationForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Validación en tiempo real
function setupRealTimeValidation() {
    const dniInput = document.getElementById('dni');
    const telefonoInput = document.getElementById('telefono');
    
    // Validación DNI (solo números, 7-8 dígitos)
    dniInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 8) {
            this.value = this.value.slice(0, 8);
        }
    });
    
    // Validación teléfono
    telefonoInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
    });
    
    // Validación nombres (solo letras y espacios)
    ['nombre', 'apellido'].forEach(fieldId => {
        document.getElementById(fieldId).addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        });
    });
}

// Validación de campos
function validateField(event) {
    const field = event.target;
    const fieldGroup = field.closest('.form-group');
    
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    // Validación según tipo de campo
    switch (field.id) {
        case 'dni':
            if (!/^\d{7,8}$/.test(field.value)) {
                isValid = false;
                errorMessage = 'El DNI debe tener 7 u 8 dígitos';
            }
            break;
        case 'telefono':
            if (!/^[\d+\-\s()]{8,}$/.test(field.value)) {
                isValid = false;
                errorMessage = 'Ingrese un número de teléfono válido';
            }
            break;
        case 'nombre':
        case 'apellido':
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(field.value)) {
                isValid = false;
                errorMessage = 'Debe contener al menos 2 letras';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(fieldGroup, errorMessage);
    }
    
    return isValid;
}

function showFieldError(fieldGroup, message) {
    fieldGroup.classList.add('error');
    
    let errorElement = fieldGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        fieldGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const fieldGroup = typeof field === 'object' ? field.closest('.form-group') : field.target.closest('.form-group');
    fieldGroup.classList.remove('error');
    
    const errorElement = fieldGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Manejo del envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Si hay un amenity seleccionado desde las tarjetas, asegurarse de que esté en el FormData
    if (selectedAmenity) {
        formData.set('amenity', selectedAmenity);
    }
    
    // Validar formulario completo
    if (!validateForm(form)) {
        showNotification('Por favor, corrija los errores en el formulario', 'error');
        return;
    }
    
    // Verificar disponibilidad final
    if (!verifyAvailability(formData)) {
        showNotification('El horario seleccionado ya no está disponible', 'error');
        return;
    }
    
    // Simular envío
    submitReservation(formData);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        // Skip validation for hidden amenity field if amenity is selected from cards
        if (field.id === 'amenity' && selectedAmenity) {
            return;
        }
        
        if (!field.value.trim()) {
            const fieldGroup = field.closest('.form-group');
            showFieldError(fieldGroup, 'Este campo es obligatorio');
            isValid = false;
        } else {
            // Validación específica
            const fieldValidation = validateField({ target: field });
            if (!fieldValidation) {
                isValid = false;
            }
        }
    });
    
    // Verificar que hay un amenity seleccionado
    if (!selectedAmenity) {
        showNotification('Debe seleccionar un espacio para reservar', 'error');
        isValid = false;
    }
    
    return isValid;
}

function verifyAvailability(formData) {
    const date = formData.get('fecha');
    const amenity = selectedAmenity || formData.get('amenity');
    const hora = formData.get('hora');
    const duracion = parseInt(formData.get('duracion'));
    
    if (!date || !amenity || !hora || !duracion) {
        return false;
    }
    
    // Generar array de horas a reservar
    const startHour = parseInt(hora.split(':')[0]);
    const hoursToReserve = [];
    
    for (let i = 0; i < duracion; i++) {
        const hour = String(startHour + i).padStart(2, '0') + ':00';
        hoursToReserve.push(hour);
    }
    
    // Verificar que todas las horas estén disponibles
    const occupiedHours = (reservationData.occupiedSlots[date] && 
                          reservationData.occupiedSlots[date][amenity]) || [];
    
    return hoursToReserve.every(hour => !occupiedHours.includes(hour));
}

function submitReservation(formData) {
    const submitBtn = document.querySelector('.btn-primary');
    
    // Mostrar loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simular delay de red
    setTimeout(() => {
        // Simular reserva exitosa
        const reservationData = {
            id: generateReservationId(),
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            dni: formData.get('dni'),
            telefono: formData.get('telefono'),
            lote: formData.get('lote'),
            amenity: selectedAmenity || formData.get('amenity'),
            fecha: formData.get('fecha'),
            hora: formData.get('hora'),
            duracion: formData.get('duracion'),
            observaciones: formData.get('observaciones') || 'Ninguna',
            timestamp: new Date().toISOString()
        };
        
        // Guardar reserva (simulated)
        saveReservation(reservationData);
        
        // Mostrar modal de confirmación
        showSuccessModal(reservationData);
        
        // Limpiar formulario y selecciones
        document.getElementById('reservationForm').reset();
        clearSelectedAmenity();
        selectedDate = null;
        updateCalendar();
        
        // Restaurar botón
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
    }, 2000);
}

function generateReservationId() {
    return 'RES-' + Date.now().toString().slice(-6);
}

function saveReservation(reservationData) {
    // En una aplicación real, aquí se enviaría al servidor
    console.log('Reserva guardada:', reservationData);
    
    // Actualizar datos locales
    const date = reservationData.fecha;
    const amenity = reservationData.amenity;
    const hora = reservationData.hora;
    const duracion = parseInt(reservationData.duracion);
    
    if (!window.reservationData.occupiedSlots[date]) {
        window.reservationData.occupiedSlots[date] = {};
    }
    
    if (!window.reservationData.occupiedSlots[date][amenity]) {
        window.reservationData.occupiedSlots[date][amenity] = [];
    }
    
    // Agregar horas ocupadas
    const startHour = parseInt(hora.split(':')[0]);
    for (let i = 0; i < duracion; i++) {
        const hourToAdd = String(startHour + i).padStart(2, '0') + ':00';
        window.reservationData.occupiedSlots[date][amenity].push(hourToAdd);
    }
}

// Modal de confirmación
function showSuccessModal(reservationData) {
    const modal = document.getElementById('successModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <p><strong>Reserva confirmada exitosamente</strong></p>
        <p><strong>ID de reserva:</strong> ${reservationData.id}</p>
        <p><strong>Espacio:</strong> ${getAmenityName(reservationData.amenity)}</p>
        <p><strong>Fecha:</strong> ${formatDate(reservationData.fecha)}</p>
        <p><strong>Hora:</strong> ${reservationData.hora}</p>
        <p><strong>Duración:</strong> ${reservationData.duracion} hora(s)</p>
        <p>Recibirá un email de confirmación en breve.</p>
    `;
    
    modal.style.display = 'block';
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

function getAmenityName(amenityId) {
    return reservationData.amenities[amenityId]?.name || amenityId;
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Agregar estilos de animación para notificaciones y elementos seleccionados
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;