import { FlowService } from '@/services/flows.service'
import { IntentService } from '@/services/intent.service'
import { UserService } from '@/services/users.service'
import { loadTemplates } from '@/utils/load-templates'
import * as bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import 'reflect-metadata'
import Container from 'typedi'
import { db } from './db'
import { channelTypes, users } from './schema'

async function seedChannelTypes() {
  try {
    await db
      .insert(channelTypes)
      .values([
        { name: 'MSG', description: 'Messenger' },
        { name: 'LIN', description: 'Line' },
        { name: 'WEB', description: 'Web' },
      ])
      .onConflictDoNothing()

    console.log('Channel types created')
  } catch (error) {
    console.error(`Can't create channel types`)
  }
}

async function seedDefaultAccount() {
  try {
    const userService = Container.get(UserService)

    const hashedPassword = await bcrypt.hash('admin', 10)

    await userService.create({
      email: 'admin@gmail.com',
      name: 'Admin',
      isVerified: true,
      password: hashedPassword,
      roles: ['ADMIN', 'USER'],
    })

    console.log('Default account created')
  } catch (error) {
    console.error(`Can't create default account`)
  }
}

async function seedIntents() {
  const intentService = Container.get(IntentService)

  const templates = loadTemplates()

  const intents = templates
    .map((template: any) => {
      return template.intents
    })
    .flat()

  try {
    await intentService.seedIntents(intents)
  } catch (error) {
    console.error(`Can't seed intents`)
  }
}

async function seedFlows() {
  const flowService = Container.get(FlowService)
  const templates = loadTemplates()

  const mainFlows = templates.map((template: any) => {
    return template.mainFlow
  })

  const subFlows = templates.map((template: any) => {
    return template.subFlows
  })

  const admin = await db.query.users.findFirst({
    where: eq(users.email, 'admin@gmail.com'),
  })

  try {
    await flowService.seedFlows(admin.id, [
      ...mainFlows.flat(),
      ...subFlows.flat(),
    ])
  } catch (error) {
    console.error(`Can't seed flows`)
  }
}

async function main() {
  seedChannelTypes()
  await seedDefaultAccount()
  await seedIntents()
  await seedFlows()

  console.log('Seed data successfully')
  process.exit(0)
}

main()
