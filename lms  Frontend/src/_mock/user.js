import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

const Assignments = [{
  name : "Example Assignment - 1",
},
{
  name : "Example Assignment - 2",
},{
  name : "Example Assignment - 3",
},{
  name : "Example Assignment - 4",
},{
  name : "Example Assignment - 5",
},
{
  name : "Example Assignment - 6",
},{
  name : "Example Assignment -  7",
},{
  name : "Example Assignment -  8",
},{
  name : "Example Assignment - 9",
},{
  name : "Example Assignment - 10",
},{
  name : "Example Assignment - 11",
},{
  name : "Example Assignment - 12",
},{
  name : "Example Assignment -  13",
},{
  name : "Example Assignment - 14",
},{
  name : "Example Assignment - 15",
},{
  name : "Example Assignment - 16",
},{
  name : "Example Assignment - 17",
},{
  name : "Example Assignment - 18",
},{
  name : "Example Assignment - 20",
},{
  name : "Example Assignment - 21",
},{
  name : "Example Assignment - 22",
},{
  name : "Example Assignment - 23",
},
{
  name : "Example Assignment - 24",
}]

export default Assignments;
