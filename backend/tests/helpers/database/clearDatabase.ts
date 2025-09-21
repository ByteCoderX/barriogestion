import { prisma } from '@database/prisma'
import fs from 'fs'
import mysqlParser from '@verycrazydog/mysql-parser'

/** Eliminar todas las tablas utilizadas durante el testing y luego
 * las vuelve a crear.
 */
export const clearDatabase = async () => {
  const sqlScriptContent = fs.readFileSync('prisma/reset_database.sql', {
    encoding: 'utf-8',
  })
  const rawQueries = mysqlParser.split(sqlScriptContent)

  for (const rawQuery of rawQueries) {
    await prisma.$executeRawUnsafe(rawQuery)
  }
}
