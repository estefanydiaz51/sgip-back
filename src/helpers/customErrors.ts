class ValidationError extends Error {
  public code: number
  public label: string
  public details: string

  constructor ({ message, code, label, details }: { message: string, code: number, label: string, details: string }) {
    super(message)
    this.code = code
    this.label = label
    this.message = message
    this.details = details

    // Manten únicamente el stack trace para instancias de ValidationError
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }
  }
}

export { ValidationError }
