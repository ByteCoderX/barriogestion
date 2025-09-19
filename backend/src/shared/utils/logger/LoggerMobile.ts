import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

const LOG_DIR = process.env.LOG_DIR ?? 'logs'

interface LoggerOptions {
  maxSize?: number // Máximo tamaño de un archivo antes de rotar (bytes)
  retentionDays?: number // Días de retención
}

export class LoggerMobile {
  private baseDir: string
  private maxSize: number
  private retentionDays: number
  private fileName: string
  private existingData: unknown[]

  constructor(options: LoggerOptions = {}) {
    this.existingData = []
    this.baseDir = 'mobile'
    this.maxSize = options.maxSize ?? 5 * 1024 * 1024 // 5 MB
    this.retentionDays = options.retentionDays ?? 7 // 1 semana
    this.fileName = 'general.json'
  }

  private get todayDir(): string {
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const dir = path.join(LOG_DIR, this.baseDir, today)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    return dir
  }

  private getLogFile(): string {
    return path.join(this.todayDir, this.fileName)
  }

  private rotateIfNeeded(filePath: string): void {
    try {
      if (!fs.existsSync(filePath)) return

      const stats = fs.statSync(filePath)
      if (stats.size >= this.maxSize) {
        const rotatedFile = `${filePath}.${Date.now()}.json`
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

  log(obj: object): void {
    this.cleanupOldLogs()

    const filePath = this.getLogFile()
    this.rotateIfNeeded(filePath)

    const data = JSON.stringify(obj, null, 2)

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `[${data}\n]`, 'utf8')
      return
    }

    const fd = fs.openSync(filePath, 'r+')
    const stats = fs.fstatSync(fd)

    if (stats.size <= 3) {
      fs.writeSync(fd, `[${data}\n]`)
    } else {
      fs.writeSync(fd, `,\n${data}\n]`, stats.size - 2)
    }
    fs.closeSync(fd)
  }
}
