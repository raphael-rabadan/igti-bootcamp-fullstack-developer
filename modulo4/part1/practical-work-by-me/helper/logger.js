import winston from 'winston'

const LOG_FILE_WITH_PATH = './log/my-bank-api.log'

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

export default global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: LOG_FILE_WITH_PATH }),
  ],
  format: combine(
    label({ label: 'my-bank-api' }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    myFormat
  ),
})
