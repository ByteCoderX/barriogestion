/**
 * Logger principal que coordina el sistema de logging de la aplicación.
 *
 * Esta clase actúa como fachada para el sistema de logging, proporcionando una interfaz
 * simple y unificada para registrar mensajes en diferentes niveles de severidad.
 * Internamente, delega las responsabilidades específicas a componentes especializados
 * para gestión de archivos, formateo y escritura.
 */
import { LogFileManager } from './LogFileManager'
import { LogFormatter } from './LogFormatter'
import { LogWriter } from './LogWriter'
import { WriterStrategy } from './WriterStrategy'

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
export type LogFormat = 'JSON' | 'LOG'

export interface LoggerOptions {
  baseDir?: string
  fileName?: string
  maxSize?: number
  retentionDays?: number
  format?: LogFormat
  writers?: WriterStrategy[]
}

export class Logger {
  private fileManager: LogFileManager
  private formatter: LogFormatter
  private writer: LogWriter
  private format: LogFormat
  private fileName: string

  /**
   * Inicializa el logger con las opciones de configuración especificadas.
   *
   * @param options - Configuración del logger incluyendo directorio base, formato,
   *                  límites de archivo y política de retención.
   */
  constructor(options: LoggerOptions = {}) {
    this.format = options.format ?? 'LOG'
    this.fileName = options.fileName ?? ''
    this.fileManager = new LogFileManager(options)
    this.formatter = new LogFormatter()
    this.writer = new LogWriter(this.formatter, this.format)

    // Agregar estrategias personalizadas si se proporcionan
    if (options.writers) {
      options.writers.forEach((writer) => this.writer.addStrategy(writer))
    }
  }

  log(
    message: string | object,
    level: LogLevel = 'INFO',
    data?: unknown,
  ): void {
    this.fileManager.cleanupOldLogs()

    const basePath = this.fileManager.getBasePath(level)
    const logPath = this.fileManager.getLogFile(level)
    const jsonPath = this.fileManager.getJsonFile(level)
    this.fileManager.rotateIfNeeded(logPath)
    this.fileManager.rotateIfNeeded(jsonPath)

    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0]

    const entry = this.formatter.createJsonEntry(
      timestamp,
      level,
      message,
      data,
    )

    this.writer.writeLog(entry, basePath)
  }

  info(msg: string | object, data?: unknown) {
    this.log(msg, 'INFO', data)
  }
  warn(msg: string | object, data?: unknown) {
    this.log(msg, 'WARN', data)
  }
  error(msg: string | object, data?: unknown) {
    this.log(msg, 'ERROR', data)
  }
  debug(msg: string | object, data?: unknown) {
    this.log(msg, 'DEBUG', data)
  }
}
