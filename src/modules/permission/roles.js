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

const breed = [
  'breed.create.own',
  'breed.get.own',
  'breed.search.own',
  'breed.update.own',
  'breed.delete.own',
];

const roles = {
  new: ['user.auth'],

  luckyPetOwner: ['user.auth', ...base, ...pet, ...breed],

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
    ...breed,
  ],

  // impersonate: [
  //   // USER
  //   'user.search',
  //   'user.impersonate',
  //   'user.stats',
  // ],
};

export default roles;
