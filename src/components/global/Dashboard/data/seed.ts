import fs from 'fs';
import path from 'path';

import { faker } from '@faker-js/faker';

import { statuses } from './data';
import { UserType } from './schema';

const users: UserType[] = Array.from({ length: 100 }, () => ({
  id: faker.number.int({ min: 1, max: 1000 }).toString(),
  name: faker.person.fullName(),
  sessionDocId: faker.number.int({ min: 0, max: 99999999999 }).toString(),
  status: faker.helpers.arrayElement(statuses).value,
  joinedAt: faker.date.anytime().toLocaleTimeString(),
  quittedAt: faker.date.anytime().toLocaleTimeString(),
}));

fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
