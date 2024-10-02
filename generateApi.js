// #!/usr/bin/env node
/* eslint-disable */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Чтение и установка переменных окружения из файла .env
const envFilePath = path.resolve('.env')
if (fs.existsSync(envFilePath)) {
  const envFileContent = fs.readFileSync(envFilePath, 'utf-8')
  envFileContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) process.env[key.trim()] = value.trim()
  })
} else {
  console.error('Error: .env file not found.')
  process.exit(1)
}

// Проверка наличия URL адреса файла openapi.json
const API_SCHEMA_URL = process.env.GENERATE_API_SCHEMA_URL
if (!API_SCHEMA_URL) {
  console.error('Error: GENERATE_API_SCHEMA_URL is not defined in .env file.')
  process.exit(1)
}

// Путь к сгенерированному API
const GENERATED_API_PATH = path.resolve('./src/api/generated')

// Удаляем предыдущую версию и создаем новую директорию
fs.rmSync(GENERATED_API_PATH, { recursive: true, force: true })
fs.mkdirSync(GENERATED_API_PATH, { recursive: true })

// Генерация API с использованием openapi-generator-cli
execSync(
  `openapi-generator-cli generate -i ${API_SCHEMA_URL} -g typescript-axios -o ${GENERATED_API_PATH} --skip-validate-spec --additional-properties useSingleRequestParameter=true`,
  { stdio: 'inherit' }
)

// Удаление ненужных файлов
const deleteUselessFiles = dirPath =>
  ['.gitignore', '.npmignore', '.openapi-generator-ignore', 'git_push.sh', '.openapi-generator'].forEach(name =>
    fs.rmSync(path.join(dirPath, name), { force: true, recursive: true })
  )
deleteUselessFiles(GENERATED_API_PATH)

// Форматирование файла api.ts с помощью prettier
execSync(`prettier --write ${path.join(GENERATED_API_PATH, 'api.ts')}`, { stdio: 'inherit' })

console.log('---------------------------')
console.log('')
console.log('  API generation complete  ')
console.log('')
console.log('---------------------------')
