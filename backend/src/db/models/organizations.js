const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const organizations = sequelize.define(
    'organizations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  organizations.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.organizations.hasMany(db.users, {
      as: 'users_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.companies, {
      as: 'companies_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.payments, {
      as: 'payments_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.posts, {
      as: 'posts_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.preferences, {
      as: 'preferences_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    //end loop

    db.organizations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.organizations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return organizations;
};
