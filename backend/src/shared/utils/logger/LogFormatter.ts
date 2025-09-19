/**
 * Formateador de entradas de registro responsable de convertir datos de log en formatos legibles.
 *
 * Esta clase maneja la serialización segura de objetos, la creación de entradas JSON estructuradas
 * y el formateo de mensajes de log en diferentes estilos (LOG tradicional o JSON).
 * Garantiza que los objetos no serializables sean manejados adecuadamente sin interrumpir
 * el proceso de logging.
 */
import { LogLevel, LogFormat } from './Logger'

export class LogFormatter {
    /**
     * Serializa un objeto a JSON de manera segura, manejando objetos no serializables.
     *
     * Si la serialización falla, retorna un mensaje de error en lugar de lanzar una excepción.
     * Soporta formato pretty-printing cuando se especifica.
     *
     * @param obj - Objeto a serializar
     * @param pretty - Si true, formatea el JSON con indentación
     * @returns Cadena JSON o mensaje de error
     */
    safeStringify(obj: unknown, pretty = false): string {
        try {
            return JSON.stringify(
                obj,
                pretty ? null : undefined,
                pretty ? 2 : undefined,
            )
        } catch {
            return '[unserializable object]'
        }
    }

    /**
     * Crea una entrada JSON estructurada con todos los componentes del log.
     *
     * @param timestamp - Marca de tiempo en formato ISO
     * @param level - Nivel de severidad del log
     * @param message - Mensaje o objeto del log
     * @param data - Datos adicionales asociados al log
     * @returns Objeto con la estructura completa del log
     */
    createJsonEntry(
        timestamp: string,
        level: LogLevel,
        message: unknown,
        data: unknown,
    ) {
        return {
            timestamp,
            level,
            message,
            data,
        }
    }

    /**
     * Formatea una entrada de log según el formato especificado.
     *
     * Para formato JSON, serializa la entrada completa. Para formato LOG,
     * crea una cadena legible con timestamp, nivel y mensaje formateado.
     *
     * @param timestamp - Marca de tiempo del log
     * @param level - Nivel de severidad
     * @param message - Mensaje del log
     * @param data - Datos adicionales
     * @param fileName - Nombre del archivo (afecta el formato)
     * @param format - Formato deseado (JSON o LOG)
     * @returns Cadena formateada del log
     */
    formatLogEntry(
        timestamp: string,
        level: LogLevel,
        message: unknown,
        data: unknown,
        fileName: string,
        format: LogFormat,
    ): string {
        if (format === 'JSON') {
            return (
                JSON.stringify(
                    this.createJsonEntry(timestamp, level, message, data),
                    null,
                    2,
                ) + '\n'
            )
        }

        let formattedMessage: string
        if (typeof message === 'object') {
            formattedMessage = this.safeStringify(message, true)
        } else {
            formattedMessage = message as string
        }

        let logEntry
        if (fileName) {
            logEntry = `[${timestamp}] [${level}] ${formattedMessage}`
        } else {
            logEntry =
                level === 'ERROR'
                    ? `[${timestamp}] ${formattedMessage}`
                    : `[${timestamp}] [${level}] ${formattedMessage}`
        }

        if (data !== undefined) {
            logEntry += ` | Data: ${this.safeStringify(data, true)}`
        }

        logEntry += '\n'
        return logEntry
    }
}
