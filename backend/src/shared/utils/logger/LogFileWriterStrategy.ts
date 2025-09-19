/**
 * Estrategia de escritura que genera archivos de log en formato tradicional (LOG).
 *
 * Esta estrategia escribe entradas de log en un formato legible por humanos,
 * con timestamp, nivel de severidad y mensaje formateado.
 */
import { WriterStrategy, LogEntry } from './WriterStrategy'
import { LogFormatter } from './LogFormatter'
import { LogFormat, LogLevel } from './Logger'
import fs from 'fs'
import path from 'path'

export class LogFileWriterStrategy implements WriterStrategy {
    private formatter: LogFormatter
    private format: LogFormat

    /**
     * Inicializa la estrategia con el formateador y formato especificados.
     *
     * @param formatter - Instancia del formateador de logs
     * @param format - Formato de salida (LOG o JSON)
     */
    constructor(formatter: LogFormatter, format: LogFormat = 'LOG') {
        this.formatter = formatter
        this.format = format
    }

    /**
     * Escribe la entrada de log en formato LOG.
     * Maneja errores de forma robusta y asegura que los directorios existan.
     *
     * @param entry - Datos del log a escribir
     * @param filePath - Ruta del archivo destino
     */
    write(entry: LogEntry, filePath: string): void {
        try {
            // Asegurar que el directorio existe
            const dir = path.dirname(filePath)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
            }

            const logEntry = this.formatter.formatLogEntry(
                entry.timestamp,
                entry.level as LogLevel,
                entry.message,
                entry.data,
                '', // fileName no usado en esta implementación
                this.format,
            )
            fs.appendFileSync(filePath, logEntry, 'utf8')
        } catch (error) {
            console.error(`Failed to write LOG to ${filePath}:`, error)
            throw error // Re-lanzar para que el try-catch en LogWriter lo capture
        }
    }

    /**
     * Retorna la extensión de archivo para logs tradicionales.
     *
     * @returns Extensión '.log'
     */
    getFileExtension(): string {
        return '.log'
    }
}
