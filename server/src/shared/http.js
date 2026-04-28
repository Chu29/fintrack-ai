export function sendSuccess(req, res, data, status = 200) {
  res.status(status).json({
    ok: true,
    data,
    requestId: req.requestId,
  })
}

