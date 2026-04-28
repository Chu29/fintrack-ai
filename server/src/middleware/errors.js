export class AppError extends Error {
  constructor(status, message, code = 'APP_ERROR') {
    super(message)
    this.status = status
    this.code = code
  }
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    ok: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
    requestId: req.requestId,
  })
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  res.status(status).json({
    ok: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Something went wrong',
    },
    requestId: req.requestId,
  })
}
