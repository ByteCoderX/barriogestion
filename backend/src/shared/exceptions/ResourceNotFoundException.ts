import { AppException, httpStatusCodes } from './AppException'

export class ResourceNotFoundException extends AppException {
  constructor(message?: string) {
    super(message ?? 'Recurso no encontrado.', httpStatusCodes.resourceNotFound)
  }
}
