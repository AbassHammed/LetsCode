import fs from 'fs';
import path from 'path';

import { faker } from '@faker-js/faker';

import { statuses } from './data';
import { UserSchemaType } from './schema';

const users: UserSchemaType[] = Array.from({ length: 100 }, () => ({
  id: faker.number.int({ min: 1, max: 1000 }).toString(),
  name: faker.person.fullName(),
  connected: faker.helpers.arrayElement(statuses).value,
  joinedAt: faker.date.anytime().toString(),
  quittedAt: faker.date.anytime().toString(),
}));

fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
