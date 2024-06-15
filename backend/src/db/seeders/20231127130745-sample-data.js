const db = require('../models');
const Users = db.users;

const Companies = db.companies;

const Payments = db.payments;

const Posts = db.posts;

const Preferences = db.preferences;

const Organizations = db.organizations;

const CompaniesData = [
  {
    name: 'Tech Innovators',

    address: '123 Tech Street, Silicon Valley, CA',

    email: 'contact@techinnovators.com',

    // type code here for "relation_one" field
  },

  {
    name: 'Creative Solutions',

    address: '456 Creative Avenue, New York, NY',

    email: 'info@creativesolutions.com',

    // type code here for "relation_one" field
  },

  {
    name: 'Marketing Gurus',

    address: '789 Marketing Blvd, Los Angeles, CA',

    email: 'support@marketinggurus.com',

    // type code here for "relation_one" field
  },
];

const PaymentsData = [
  {
    amount: 29.99,

    paid_at: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    amount: 49.99,

    paid_at: new Date('2023-10-02T11:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    amount: 19.99,

    paid_at: new Date('2023-10-03T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const PostsData = [
  {
    content: 'Check out our latest product launch! #innovation #tech',

    generated_at: new Date('2023-10-01T10:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content:
      'Excited to announce our new partnership with XYZ Corp! #business #growth',

    generated_at: new Date('2023-10-02T11:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Join us for a webinar on the future of AI. #webinar #AI',

    generated_at: new Date('2023-10-03T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const PreferencesData = [
  {
    goal: 'Increase engagement',

    tone: 'Friendly',

    style: 'Casual',

    topics: 'Tech, Innovation, Startups',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    goal: 'Promote products',

    tone: 'Professional',

    style: 'Formal',

    topics: 'Business, Marketing, Sales',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    goal: 'Build brand awareness',

    tone: 'Inspirational',

    style: 'Motivational',

    topics: 'AI, Future, Technology',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Justus Liebig',
  },

  {
    name: 'Lynn Margulis',
  },

  {
    name: 'Franz Boas',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }
}

async function associateCompanyWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Company0 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Company0?.setOrganization) {
    await Company0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Company1 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Company1?.setOrganization) {
    await Company1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Company2 = await Companies.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Company2?.setOrganization) {
    await Company2.setOrganization(relatedOrganization2);
  }
}

async function associatePaymentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setUser) {
    await Payment0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setUser) {
    await Payment1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setUser) {
    await Payment2.setUser(relatedUser2);
  }
}

async function associatePaymentWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setOrganization) {
    await Payment0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setOrganization) {
    await Payment1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setOrganization) {
    await Payment2.setOrganization(relatedOrganization2);
  }
}

async function associatePostWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Post0 = await Posts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Post0?.setUser) {
    await Post0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Post1 = await Posts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Post1?.setUser) {
    await Post1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Post2 = await Posts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Post2?.setUser) {
    await Post2.setUser(relatedUser2);
  }
}

async function associatePostWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Post0 = await Posts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Post0?.setOrganization) {
    await Post0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Post1 = await Posts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Post1?.setOrganization) {
    await Post1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Post2 = await Posts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Post2?.setOrganization) {
    await Post2.setOrganization(relatedOrganization2);
  }
}

async function associatePreferenceWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Preference0 = await Preferences.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Preference0?.setUser) {
    await Preference0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Preference1 = await Preferences.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Preference1?.setUser) {
    await Preference1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Preference2 = await Preferences.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Preference2?.setUser) {
    await Preference2.setUser(relatedUser2);
  }
}

async function associatePreferenceWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Preference0 = await Preferences.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Preference0?.setOrganization) {
    await Preference0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Preference1 = await Preferences.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Preference1?.setOrganization) {
    await Preference1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Preference2 = await Preferences.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Preference2?.setOrganization) {
    await Preference2.setOrganization(relatedOrganization2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Companies.bulkCreate(CompaniesData);

    await Payments.bulkCreate(PaymentsData);

    await Posts.bulkCreate(PostsData);

    await Preferences.bulkCreate(PreferencesData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateCompanyWithOrganization(),

      await associatePaymentWithUser(),

      await associatePaymentWithOrganization(),

      await associatePostWithUser(),

      await associatePostWithOrganization(),

      await associatePreferenceWithUser(),

      await associatePreferenceWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('companies', null, {});

    await queryInterface.bulkDelete('payments', null, {});

    await queryInterface.bulkDelete('posts', null, {});

    await queryInterface.bulkDelete('preferences', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
