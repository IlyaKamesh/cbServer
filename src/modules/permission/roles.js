export const listRoles = ['new', 'luckyPetOwner', 'impersonate'];

const base = [
  'base.create.own',
  'base.get.own',
  'base.search.own',
  'base.update.own',
  'base.delete.own',
];

const pet = [
  'pet.create.own',
  'pet.get.own',
  'pet.search.own',
  'pet.update.own',
  'pet.delete.own',
];

const roles = {
  new: ['user.auth'],

  luckyPetOwner: ['user.auth', ...base, ...pet],

  admin: [
    // USER
    'user.auth',
    'user.get.all',
    'user.delete.any',
    'user.update.any',
    'user.search',
    'user.impersonate',
    'user.stats',

    // EXAMPLE
    ...base,
    ...pet,
  ],

  // impersonate: [
  //   // USER
  //   'user.search',
  //   'user.impersonate',
  //   'user.stats',
  // ],
};

export default roles;
