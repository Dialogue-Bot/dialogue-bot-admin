import fs from 'fs'
import path from 'path'

export const loadTemplates = () => {
  const pathOfTemplate = path.join(process.cwd(), '/data/templates.json')

  let templates: any = fs.readFileSync(pathOfTemplate, 'utf-8') as unknown

  templates = JSON.parse(templates as string)

  return templates
}
