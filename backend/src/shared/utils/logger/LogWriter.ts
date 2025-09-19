/**
 * Gestor de escritura de logs que utiliza el patrón Strategy para soportar múltiples formatos.
 *
 * Esta clase permite agregar diferentes estrategias de escritura, permitiendo
 * extender el sistema con nuevos formatos sin modificar el código existente.
 */
import { WriterStrategy, LogEntry } from './WriterStrategy'
import { LogFileWriterStrategy } from './LogFileWriterStrategy'
import { JsonFileWriterStrategy } from './JsonFileWriterStrategy'
import { LogFormatter } from './LogFormatter'
import { LogFormat } from './Logger'

export class LogWriter {
    private strategies: WriterStrategy[] = []

    /**
     * Inicializa el escritor con las estrategias por defecto.
     *
     * @param formatter - Instancia del formateador de logs
     * @param format - Formato para la estrategia LOG
     *
     */
    constructor(formatter: LogFormatter, format: LogFormat = 'LOG') {
        // Agregar estrategias por defecto
        this.addStrategy(new LogFileWriterStrategy(formatter, format))
        this.addStrategy(new JsonFileWriterStrategy())
    }

    /**
     * Agrega una nueva estrategia de escritura al sistema.
     *
     * @param strategy - Estrategia a agregar
     */
    addStrategy(strategy: WriterStrategy): void {
        this.strategies.push(strategy)
    }

    /**
     * Escribe la entrada de log utilizando todas las estrategias configuradas.
     *
     * Cada estrategia escribe en su propio archivo basado en la extensión que retorna.
     * Maneja errores de escritura para evitar que fallen todas las estrategias si una falla.
     *
     * @param entry - Datos del log a escribir
     * @param basePath - Ruta base donde crear los archivos de log
     */
    writeLog(entry: LogEntry, basePath: string): void {
        this.strategies.forEach((strategy) => {
            try {
                const filePath = basePath + strategy.getFileExtension()
                strategy.write(entry, filePath)
            } catch (error) {
                console.error(
                    `Error writing log with strategy ${strategy.constructor.name}:`,
                    error,
                )
            }
        })
    }
}
