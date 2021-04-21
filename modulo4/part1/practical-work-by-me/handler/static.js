export const handlerStatic = (req, res, next) => {
  logger.info(`GET ${req.path} [STATIC] `)
  next()
}
