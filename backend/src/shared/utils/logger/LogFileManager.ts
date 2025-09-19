/**
 * Gestor de Archivos de registro responsable de manejar rutas, rotación y limpieza de archivos de logs
 *
 * Esta clase centraliza la lógica relacionada con la gestioón del sistema de archivos para el logger
 * incluyendo la creación de directorios, determinación de rutas de archivos, rotación automática
 * cuando los archivos exceden el tamaño máximo, y eliminación de logs antiguos según la política
 * de retención configurada.
 */
import type { LoggerOptions, LogLevel } from './Logger'
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

const LOG_DIR = process.env.LOG_DIR ?? 'logs'

export class LogFileManager {
    private baseDir: string
    private maxSize: number
    private retentionDays: number
    private fileName: string

    /**
     * Inicializa el gestor de archivos con las opciones de configuración proporcionadas.
     *
     * @param options - Opciones de configuración del logger que incluyen directorio base,
     *                  tamaño máximo de archivo, días de retención y nombre de archivo personalizado.
     */
    constructor(options: LoggerOptions) {
        this.baseDir = options.baseDir ?? 'general'
        this.maxSize = options.maxSize ?? 5 * 1024 * 1024
        this.retentionDays = options.retentionDays ?? 7
        this.fileName = options.fileName ?? ''
    }

    private get todayDir(): string {
        const today = new Date().toISOString().split('T')[0]
        const dir = path.join(LOG_DIR, this.baseDir, today)

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        return dir
    }

    /**
     * Obtiene la ruta completa del archivo de log basado en el nivel de log.
     *
     * Si se especifica un nombre de archivo personalizado, se utiliza ese nombre.
     * De lo contrario, utiliza 'errors.log' para logs de error y 'access.log' para otros niveles.
     *
     * @param level - Nivel del log (INFO, WARN, ERROR, DEBUG)
     * @returns Ruta completa del archivo de log
     */
    getLogFile(level: LogLevel): string {
        if (this.fileName) return path.join(this.todayDir, this.fileName)
        if (level === 'ERROR') {
            return path.join(this.todayDir, 'errors.log')
        }
        return path.join(this.todayDir, 'access.log')
    }

    /**
     * Obtiene la ruta completa del archivo JSON basado en el nivel de log.
     *
     * Si se especifica un nombre de archivo personalizado, se utiliza ese nombre con extensión .json.
     * De lo contrario, utiliza 'errors.json' para logs de error y 'access.json' para otros niveles.
     *
     * @param level - Nivel del log (INFO, WARN, ERROR, DEBUG)
     * @returns Ruta completa del archivo JSON
     */
    getJsonFile(level: LogLevel): string {
        if (this.fileName) {
            const base = this.fileName.replace(/\.log$/, '')
            return path.join(this.todayDir, base + '.json')
        }
        if (level === 'ERROR') {
            return path.join(this.todayDir, 'errors.json')
        }
        return path.join(this.todayDir, 'access.json')
    }

    /**
     * Obtiene la ruta base para archivos de log sin extensión.
     *
     * @param level - Nivel del log
     * @returns Ruta base para archivos de log
     */
    getBasePath(level: LogLevel): string {
        if (this.fileName) {
            const base = this.fileName.replace(/\.log$/, '')
            return path.join(this.todayDir, base)
        }
        if (level === 'ERROR') {
            return path.join(this.todayDir, 'errors')
        }
        return path.join(this.todayDir, 'access')
    }

    /**
     * Verifica si el archivo necesita rotación y la realiza si es necesario.
     *
     * Si el tamaño del archivo excede el límite máximo configurado, el archivo se renombra
     * con un timestamp y se comprime usando GZIP. El archivo original se reemplaza
     * por uno nuevo vacío.
     *
     * @param filePath - Ruta completa del archivo a verificar
     */
    rotateIfNeeded(filePath: string): void {
        try {
            if (!fs.existsSync(filePath)) return

            const stats = fs.statSync(filePath)
            if (stats.size >= this.maxSize) {
                const ext = path.extname(filePath)
                const rotatedFile = `${filePath}.${Date.now()}${ext}`
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

    /**
     * Elimina los directorios de logs antiguos que exceden el período de retención configurado.
     *
     * Recorre todos los directorios en el directorio base de logs y elimina aquellos
     * cuya fecha de modificación es anterior al límite de retención establecido.
     * Esta operación se realiza de manera recursiva y forzada.
     */
    cleanupOldLogs(): void {
        try {
            const basePath = path.join(LOG_DIR, this.baseDir)
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
}
