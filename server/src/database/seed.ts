import { REFERENCE_ID_CONNECT_AGENT } from '@/config'
import { NlpService } from '@/services/nlp.service'
import { UserService } from '@/services/users.service'
import * as bcrypt from 'bcrypt'
import Container from 'typedi'
import { db } from './db'
import { channelTypes, intents } from './schema'

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

async function detectConnectAgent() {
  try {
    const userService = Container.get(UserService)
    const nlpService = Container.get(NlpService)

    const user = await userService.findOneByEmail('admin@gmail.com')

    const prompts = [
      'How can I speak to customer support?',
      'What are the ways to contact your support team?',
      'Is there a phone number I can call for assistance?',
      'How do I reach a live agent?',
      'Can I chat with someone from customer service?',
      `What's the best way to get help with my issue?`,
      'Is there an email address I can use to contact support?',
      'I want to connect agent?',
      'Do you have a support hotline?',
      'How can I get in touch with your helpdesk?',
      'Where can I find your customer service contact information?',
    ]
    const answers = ['Sure, please wait a few minutes']

    const intentData = {
      name: 'connect-agent',
      referenceId: REFERENCE_ID_CONNECT_AGENT,
      intents: [
        {
          intent: 'greeting.connect-agent',
          prompts,
          answers,
        },
      ],
      entities: [],
    }

    await nlpService.train({
      intents: intentData.intents,
      referenceId: intentData.referenceId,
    })

    await db
      .insert(intents)
      .values({
        ...intentData,
        userId: user.id,
      })
      .returning()

    console.log('Default intent connect agent created')
  } catch (error) {
    console.log(
      `Can't create default intent connect agent created ${error.message}`,
    )
  }
}

async function main() {
  await seedChannelTypes()
  await seedDefaultAccount()
  await detectConnectAgent()

  console.log('Seed data successfully')
  process.exit(0)
}

main()
