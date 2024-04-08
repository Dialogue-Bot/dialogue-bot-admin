import { AuthService } from '@/services/auth.service'
import Container from 'typedi'
import { db } from './db'
import { channelTypes } from './schema'

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
    const authService = Container.get(AuthService)

    await authService.register({
      email: 'admin@gmail.com',
      name: 'Admin',
      password: 'admin',
      passwordConfirm: 'admin',
    })

    console.log('Default account created')
  } catch (error) {
    console.error(`Can't create default account`)
  }
}

async function main() {
  await seedChannelTypes()
  await seedDefaultAccount()

  console.log('Seed data successfully')
  process.exit(0)
}

main()
