import { AppError } from './errors.js'

function parseSegment(schema, value, segment) {
  const parsed = schema.safeParse(value)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    const detail = issue?.message ? `: ${issue.message}` : ''
    throw new AppError(400, `Invalid request ${segment}${detail}`, 'VALIDATION_ERROR')
  }

  return parsed.data
}

export function validateRequest({ params, query, body } = {}) {
  return function requestValidator(req, res, next) {
    const validated = {}

    if (params) {
      validated.params = parseSegment(params, req.params ?? {}, 'params')
    }

    if (query) {
      validated.query = parseSegment(query, req.query ?? {}, 'query')
    }

    if (body) {
      validated.body = parseSegment(body, req.body ?? {}, 'body')
    }

    req.validated = validated
    next()
  }
}
