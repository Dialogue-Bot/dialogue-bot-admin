import { UserService } from '@/services/users.service'
import * as bcrypt from 'bcrypt'
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

async function main() {
  await seedChannelTypes()
  await seedDefaultAccount()

  console.log('Seed data successfully')
  process.exit(0)
}

main()
