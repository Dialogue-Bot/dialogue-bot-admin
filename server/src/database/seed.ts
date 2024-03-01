import * as bcrypt from 'bcrypt';
import { db } from './db';
import { channelTypes, users } from './schema';

async function seedChannelTypes() {
   try {
      await db
         .insert(channelTypes)
         .values([
            { name: 'MSG', description: 'Messenger' },
            { name: 'LIN', description: 'Line' },
            { name: 'WEB', description: 'Web' },
         ])
         .onConflictDoNothing();

      console.log('Channel types created');
   } catch (error) {
      console.error(`Can't create channel types`);
   }
}

async function seedDefaultAccount() {
   try {
      const hashedPassword = await bcrypt.hash('Hello@123', 10);
      await db
         .insert(users)
         .values({
            email: 'admin@gmail.com',
            password: hashedPassword,
            name: 'admin',
         })
         .onConflictDoNothing();
   } catch (error) {
      console.error(`Can't create default account`);
   }
}

async function main() {
   await seedChannelTypes();
   await seedDefaultAccount();

   console.log('Seed data successfully');
   process.exit(0);
}

main();
