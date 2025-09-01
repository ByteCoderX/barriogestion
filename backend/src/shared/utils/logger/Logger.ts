import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import { config } from '@config'

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

interface LoggerOptions {
  baseDir?: string // Carpeta raíz de logs
  fileName?: string // Nombre del archivo
  maxSize?: number // Máximo tamaño de un archivo antes de rotar (bytes)
  retentionDays?: number // Días de retención
}

export class Logger {
  private baseDir: string
  private maxSize: number
  private retentionDays: number
  private fileName: string

  /**
   * Crea una nueva instancia del Logger.
   *
   * @constructor
   * @param {LoggerOptions} [options={}] - Opciones de configuración del Logger.
   *
   * @typedef {Object} LoggerOptions
   * @property {string} [baseDir] - Carpeta raíz donde se guardarán los logs.
   *                                Por defecto: `"logs"`.
   * @property {number} [maxSize] - Máximo tamaño en bytes que puede alcanzar un archivo
   *                                antes de rotar. Por defecto: `1048576` (1MB).
   * @property {number} [retentionDays] - Cantidad de días que se mantendrán los logs antiguos.
   *                                      Por defecto: `30`.
   * @property {string} [fileName] - Nombre único del archivo de log.
   *                                 Si se especifica, todos los logs se escribirán en este archivo.
   *                                 Si no se especifica, se separan en `access.log` y `errors.log`.
   *
   * @example
   * // Todos los logs en un solo archivo
   * new Logger({
   *   baseDir: "general",
   *   maxSize: 5000,
   *   retentionDays: 7,
   *   fileName: "pepe.log"
   * });
   *
   * @example
   * // Logs separados en access.log y errors.log
   * new Logger({
   *   baseDir: "general",
   *   maxSize: 1048576
   * });
   */
  constructor(options: LoggerOptions = {}) {
    this.baseDir = options.baseDir ?? 'general'
    this.maxSize = options.maxSize ?? 5 * 1024 * 1024 // 5 MB
    this.retentionDays = options.retentionDays ?? 7 // 1 semana
    this.fileName = options.fileName ?? ''
  }

  private get todayDir(): string {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const dir = path.join(config.LOG_DIR, this.baseDir, today)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    return dir
  }

  private getLogFile(level: LogLevel): string {
    if (this.fileName) return path.join(this.todayDir, this.fileName)

    if (level === 'ERROR') {
      return path.join(this.todayDir, 'errors.log')
    }
    return path.join(this.todayDir, 'access.log')
  }

  private rotateIfNeeded(filePath: string): void {
    try {
      if (!fs.existsSync(filePath)) return

      const stats = fs.statSync(filePath)
      if (stats.size >= this.maxSize) {
        const rotatedFile = `${filePath}.${Date.now()}.log`
        fs.renameSync(filePath, rotatedFile)

        const gzip = zlib.createGzip()
        const inp = fs.createReadStream(rotatedFile)
        const out = fs.createWriteStream(rotatedFile + '.gz')

        inp
          .pipe(gzip)
          .pipe(out)
          .on('finish', () => {
            fs.unlinkSync(rotatedFile)
          })
      }
    } catch (err) {
      console.error('Error en rotación de logs:', err)
    }
  }

  private cleanupOldLogs(): void {
    try {
      const basePath = path.join(config.LOG_DIR, this.baseDir)
      if (!fs.existsSync(basePath)) return

      const folders = fs.readdirSync(basePath)
      const now = Date.now()
      const retentionMs = this.retentionDays * 24 * 60 * 60 * 1000

      for (const folder of folders) {
        const folderPath = path.join(basePath, folder)
        const stats = fs.statSync(folderPath)

        if (stats.isDirectory()) {
          if (now - stats.mtimeMs > retentionMs) {
            fs.rmSync(folderPath, { recursive: true, force: true })
          }
        }
      }
    } catch (err) {
      console.error('Error limpiando logs:', err)
    }
  }

  log(message: string, level: LogLevel = 'INFO', data?: unknown): void {
    this.cleanupOldLogs()

    const filePath = this.getLogFile(level)
    this.rotateIfNeeded(filePath)

    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0]

    let logEntry
    if (this.fileName) logEntry = `[${timestamp}] [${level}] ${message}`
    else {
      logEntry =
        level === 'ERROR'
          ? `[${timestamp}] ${message}`
          : `[${timestamp}] [${level}] ${message}`
    }

    if (data !== undefined) {
      try {
        logEntry += ` | Data: ${JSON.stringify(data)}`
      } catch {
        logEntry += ` | Data: [unserializable object]`
      }
    }

    logEntry += '\n'
    fs.appendFileSync(filePath, logEntry, 'utf8')
  }

  info(msg: string, data?: unknown) {
    this.log(msg, 'INFO', data)
  }
  warn(msg: string, data?: unknown) {
    this.log(msg, 'WARN', data)
  }
  error(msg: string, data?: unknown) {
    this.log(msg, 'ERROR', data)
  }
  debug(msg: string, data?: unknown) {
    this.log(msg, 'DEBUG', data)
  }
}
