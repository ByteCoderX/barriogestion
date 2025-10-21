<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagar Expensa - Barrio Gestión</title>
    <link rel="stylesheet" href="../../../index.css">
    <link rel="stylesheet" href="PagarExpensas.css">
</head>
<body>
    <?php include '../../../includes/header.php'; ?>

    <main id="main">
        <div class="dashboard-container">
            <!-- Header -->
            <div class="pago-header">
                <div class="header-content">
                    <h1>Pagar Expensa</h1>
                    <p>Completa el proceso de pago de tu expensa mensual</p>
                    <div class="breadcrumb">
                        <a href="../../../index.php">Inicio</a> > <span>Expensas</span> > <span>Pagar</span>
                    </div>
                </div>
            </div>

            <!-- Información de la expensa a pagar -->
            <div class="expensa-info-card">
                <div class="info-header">
                    <h2>Detalle de Pago</h2>
                    <div class="estado-badge pendiente">PENDIENTE</div>
                </div>
                <div class="info-body">
                    <div class="info-row">
                        <span class="label">Período:</span>
                        <span class="value">Julio 2025</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Fecha de Vencimiento:</span>
                        <span class="value">10 de Julio 2025</span>
                    </div>
                    <div class="info-row total-row">
                        <span class="label">Monto Total:</span>
                        <span class="value">$125,000</span>
                    </div>
                </div>
            </div>

            <!-- Datos bancarios para transferencia -->
            <div class="datos-bancarios-card">
                <div class="card-header">
                    <h2>Datos para Transferencia</h2>
                    <button class="btn-copiar-todo" onclick="copiarTodosDatos()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copiar Todos
                    </button>
                </div>
                <div class="card-body">
                    <div class="dato-bancario">
                        <div class="dato-label">Titular de la Cuenta</div>
                        <div class="dato-valor">
                            <span id="titular">Administración Barrio Gestión S.A.</span>
                            <button class="btn-copiar" onclick="copiarDato('titular')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="dato-bancario">
                        <div class="dato-label">CUIT</div>
                        <div class="dato-valor">
                            <span id="cuit">30-71234567-8</span>
                            <button class="btn-copiar" onclick="copiarDato('cuit')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="dato-bancario">
                        <div class="dato-label">Banco</div>
                        <div class="dato-valor">
                            <span id="banco">Banco Nación</span>
                            <button class="btn-copiar" onclick="copiarDato('banco')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="dato-bancario">
                        <div class="dato-label">CBU</div>
                        <div class="dato-valor">
                            <span id="cbu">0110593520000012345678</span>
                            <button class="btn-copiar" onclick="copiarDato('cbu')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="dato-bancario">
                        <div class="dato-label">Alias</div>
                        <div class="dato-valor">
                            <span id="alias">BARRIO.GESTION.EXPENSAS</span>
                            <button class="btn-copiar" onclick="copiarDato('alias')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="dato-bancario destacado">
                        <div class="dato-label">Monto a Transferir</div>
                        <div class="dato-valor">
                            <span id="monto">$125,000.00</span>
                            <button class="btn-copiar" onclick="copiarDato('monto')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Subir comprobante -->
            <div class="comprobante-card">
                <h2>Comprobante de Pago <span class="required">*</span></h2>
                <p class="card-subtitle">Sube el comprobante de tu transferencia para validar el pago</p>
                
                <div class="upload-area" id="uploadArea">
                    <input type="file" id="comprobanteFile" accept="image/*,.pdf" hidden>
                    <div class="upload-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <h3>Arrastra tu comprobante aquí</h3>
                        <p>o haz clic para seleccionar</p>
                        <span class="file-types">PNG, JPG, PDF (máx. 5MB)</span>
                    </div>
                </div>

                <div class="file-preview" id="filePreview" style="display: none;">
                    <div class="preview-header">
                        <span class="file-name" id="fileName"></span>
                        <button class="btn-remove" onclick="removeFile()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="preview-body" id="previewBody"></div>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="action-buttons">
                <a href="../expensas.php" class="btn-cancelar">Cancelar</a>
                <button class="btn-confirmar" id="btnConfirmar" onclick="confirmarPago()" disabled>
                    Confirmar Pago
                </button>
            </div>
        </div>
    </main>

    <script src="PagarExpensas.js"></script>
</body>
</html>