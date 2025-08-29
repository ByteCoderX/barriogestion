export const httpStatusCodes = {
  resourceNotFound: 404,
  unproccesableEntity: 422,
  conflict: 409,
  unauthorized: 401,
} as const

export type HttpStatusCode =
  (typeof httpStatusCodes)[keyof typeof httpStatusCodes]

export class AppException extends Error {
  readonly statusCode: HttpStatusCode

  constructor(message: string, statusCode: HttpStatusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Object.setPrototypeOf(this, this.constructor.prototype)
  }
}
