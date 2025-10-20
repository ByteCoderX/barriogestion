import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'
import axios from 'axios'
import { Response } from 'express'
import { CarnetGenerate } from './models/CarnetGenerate'
import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { UsersCredentialsRepository } from './repositories/userCredentials/UsersCredentialsRepository'
import { UserMetaRepository } from './repositories/userMeta/UserMetaRepository'

export class DigitalIDServices {
  constructor(
    private readonly usersCredentials: UsersCredentialsRepository,
    private readonly userMetadata: UserMetaRepository,
  ) {}

  public async generateCarnet(res: Response, userDni: string) {
    if (!userDni)
      throw new AppException(
        'No se ingresó un DNI.',
        httpStatusCodes.unproccesableEntity,
      )

    const userCreds = await this.usersCredentials.getByDni(userDni)

    if (!userCreds)
      throw new AppException(
        'No se encontraron las credenciales del usuario.',
        httpStatusCodes.unproccesableEntity,
      )

    const userMeta = await this.userMetadata.getByDni(userDni)

    if (!userMeta)
      throw new AppException(
        'No se encontraron las credenciales del usuario.',
        httpStatusCodes.unproccesableEntity,
      )

    const porcentaje = 0.8
    const cantidad = Math.floor(userCreds.password.length * porcentaje)
    const carnetCode = userCreds.password.slice(
      0,
      userCreds.password.length - cantidad,
    )

    const fechaMasUnAño = new Date(userCreds.createdAt)
    fechaMasUnAño.setFullYear(userCreds.createdAt.getFullYear() + 1)

    const dia = String(fechaMasUnAño.getDate()).padStart(2, '0')
    const mes = String(fechaMasUnAño.getMonth() + 1).padStart(2, '0')
    const año = fechaMasUnAño.getFullYear()

    const fechaFormateada = `${dia}/${mes}/${año}`

    const dia2 = String(fechaMasUnAño.getDate()).padStart(2, '0')
    const mes2 = String(fechaMasUnAño.getMonth() + 1).padStart(2, '0')
    const año2 = fechaMasUnAño.getFullYear()

    const fechaFormateadaMasUnAño = `${dia2}/${mes2}/${año2}`
    // El arte de la crotera (es para que zafe)

    const carnetData = {
      nombre: `${userMeta.firstName} ${userMeta.lastName}`,
      lote: userMeta.address,
      dni: userCreds.dni,
      tipo: userCreds.admin ? 'ADMINISTRADOR' : 'PROPIETARIO',
      vigencia: fechaFormateadaMasUnAño,
      codigo: carnetCode,
      emitido: fechaFormateada,
      avatar: `https://www.gravatar.com/avatar/${userCreds.avatarHash}?s=200`,
      qrUrl: `https://barriogestion.com/public/spaces/autorization/${userCreds.dni}`,
    }

    const carnet = this.generateCarnetPDF(res, carnetData)
    return carnet
  }

  private async generateCarnetPDF(res: Response, carnetData: CarnetGenerate) {
    try {
      const doc = new PDFDocument({
        size: [400, 250],
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
      })

      // Configurar headers para descarga
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=carnet-digital.pdf',
      )

      // Pipe del PDF a la respuesta
      doc.pipe(res)

      // Fondo oscuro
      doc.rect(0, 0, 400, 250).fill('#1a1a1a')

      // Borde rojo superior
      doc.rect(0, 0, 400, 3).fill('#dc2626')

      // Header con logo (simulado como rectángulo - reemplazar con imagen real)
      if (carnetData.avatar) {
        try {
          const response = await axios.get(carnetData.avatar, {
            responseType: 'arraybuffer',
          })
          const imageBuffer = Buffer.from(response.data)
          doc.image(imageBuffer, 20, 20, {
            width: 60,
            height: 60,
            fit: [60, 60],
            align: 'center',
          })
        } catch (error) {
          // Fallback: rectángulo gris si falla la carga
          doc.rect(20, 20, 60, 60).fill('#4a4a4a')

          new Error(String(error))
        }
      } else {
        // Si no hay avatar, usar rectángulo gris
        doc.rect(20, 20, 60, 60).fill('#4a4a4a')
      }

      // Título
      doc
        .fillColor('#ffffff')
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('CARNET DIGITAL', 100, 30, { width: 200 })

      // Subtítulo
      doc
        .fontSize(8)
        .font('Helvetica')
        .text('BARRIO PRIVADO', 100, 55, { width: 200 })
        .text('SAUSALITO', 100, 65, { width: 200 })

      // Información del carnet
      const startY = 110
      const leftCol = 40
      const rightCol = 180
      const lineHeight = 20

      // Función para agregar campo
      const addField = async (
        label: string,
        value: string,
        y: number,
        color = '#ffffff',
      ) => {
        doc
          .fillColor('#9ca3af')
          .fontSize(8)
          .font('Helvetica')
          .text(label, leftCol, y)

        doc
          .fillColor(color)
          .fontSize(10)
          .font('Helvetica-Bold')
          .text(value, rightCol, y, { width: 150 })
      }

      // Campos del carnet
      addField('Nombre:', carnetData.nombre, startY)
      addField('Lote:', carnetData.lote, startY + lineHeight)
      addField('DNI:', carnetData.dni, startY + lineHeight * 2)
      addField('Tipo:', carnetData.tipo, startY + lineHeight * 3)
      addField(
        'Vigencia:',
        carnetData.vigencia,
        startY + lineHeight * 4,
        '#22c55e',
      )

      // Generar QR Code
      const qrBuffer = await QRCode.toBuffer(carnetData.qrUrl, {
        width: 80,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })

      // Agregar QR al PDF (posición derecha)
      doc.image(qrBuffer, 310, 110, { width: 70, height: 70 })

      // Texto bajo el QR
      doc
        .fillColor('#9ca3af')
        .fontSize(6)
        .font('Helvetica')
        .text('Escanear para acceder a amenidades', 295, 185, {
          width: 100,
          align: 'center',
        })

      // Footer
      doc
        .fillColor('#6b7280')
        .fontSize(7)
        .font('Helvetica')
        .text(`Código: ${carnetData.codigo}`, 20, 230)

      doc.text(`Emitido: ${carnetData.emitido}`, 280, 230, {
        width: 100,
        align: 'right',
      })

      // Finalizar PDF
      doc.end()
    } catch (error) {
      console.error('Error generando PDF:', error)
      throw new AppException(
        'Error al generar el PDF',
        httpStatusCodes.unproccesableEntity,
      )
    }
  }
}
