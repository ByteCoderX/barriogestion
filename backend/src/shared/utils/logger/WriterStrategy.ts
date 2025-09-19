/**
 * Interfaz que define un contrato para las estrategias de escritura de logs
 *
 * Permite implementar distintos formatos de salidas
 *
 */
export interface WriterStrategy {
    /**
     * Escribe una entrada de log en el formato específico de la estrategia.
     *
     * @param entry - Objeto con los datos del log (timestamp, level, message, data)
     * @param filePath - Ruta completa del archivo donde escribir
     */
    write(entry: LogEntry, filePath: string): void

    /**
     * Retorna la extensión de archivo asociada con esta estrategia.
     *
     * @returns Extensión del archivo (ej: '.log', '.json')
     */
    getFileExtension(): string
}

/**
 * Estructura de datos para una entrada de log.
 */
export interface LogEntry {
    timestamp: string
    level: string
    message: unknown
    data?: unknown
}
