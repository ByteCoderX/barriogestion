import { FieldErrors } from '@shared/types/FieldError'
import { AppException, httpStatusCodes } from './AppException'

export class InvalidRequestDataException extends AppException {
  readonly errors: FieldErrors

  constructor(errors: FieldErrors) {
    super('Datos invalidos.', httpStatusCodes.unproccesableEntity)
    this.errors = errors
  }
}
