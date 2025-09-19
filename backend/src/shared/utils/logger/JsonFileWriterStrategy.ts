/**
 * Estrategia de escritura que genera archivos de log en formato JSON estructurado.
 *
 * Esta estrategia mantiene un array de entradas JSON en el archivo
 *
 */
import { WriterStrategy, LogEntry } from './WriterStrategy'
import fs from 'fs'
import path from 'path'

export class JsonFileWriterStrategy implements WriterStrategy {
    /**
     * Escribe la entrada de log como parte de un array JSON.
     *
     * Si el archivo no existe, crea un nuevo array. Si existe, lee el array
     * actual, agrega la nueva entrada y reescribe el archivo completo.
     * Maneja errores de forma robusta para asegurar que los logs se escriban.
     *
     * @param entry - Datos del log a escribir
     * @param filePath - Ruta del archivo JSON destino
     */
    write(entry: LogEntry, filePath: string): void {
        try {
            let array: LogEntry[] = []

            // Asegurar que el directorio existe
            const dir = path.dirname(filePath)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true })
            }

            if (fs.existsSync(filePath)) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8').trim()
                    if (content) {
                        array = JSON.parse(content)
                        if (!Array.isArray(array)) array = []
                    }
                } catch (parseError) {
                    console.warn(
                        `Error parsing existing JSON file ${filePath}, starting fresh:`,
                        parseError,
                    )
                    array = []
                }
            }

            array.push(entry)
            fs.writeFileSync(filePath, JSON.stringify(array, null, 2), 'utf8')
        } catch (error) {
            console.error(`Failed to write JSON log to ${filePath}:`, error)
            throw error // Re-lanzar para que el try-catch en LogWriter lo capture
        }
    }

    /**
     * Retorna la extensión de archivo para archivos JSON.
     *
     * @returns Extensión '.json'
     */
    getFileExtension(): string {
        return '.json'
    }
}
