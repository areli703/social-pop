const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PreferencesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const preferences = await db.preferences.create(
      {
        id: data.id || undefined,

        goal: data.goal || null,
        tone: data.tone || null,
        style: data.style || null,
        topics: data.topics || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await preferences.setUser(data.user || null, {
      transaction,
    });

    await preferences.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return preferences;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const preferencesData = data.map((item, index) => ({
      id: item.id || undefined,

      goal: item.goal || null,
      tone: item.tone || null,
      style: item.style || null,
      topics: item.topics || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const preferences = await db.preferences.bulkCreate(preferencesData, {
      transaction,
    });

    // For each item created, replace relation files

    return preferences;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const preferences = await db.preferences.findByPk(id, {}, { transaction });

    await preferences.update(
      {
        goal: data.goal || null,
        tone: data.tone || null,
        style: data.style || null,
        topics: data.topics || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await preferences.setUser(data.user || null, {
      transaction,
    });

    await preferences.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return preferences;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const preferences = await db.preferences.findByPk(id, options);

    await preferences.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await preferences.destroy({
      transaction,
    });

    return preferences;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const preferences = await db.preferences.findOne(
      { where },
      { transaction },
    );

    if (!preferences) {
      return preferences;
    }

    const output = preferences.get({ plain: true });

    output.user = await preferences.getUser({
      transaction,
    });

    output.organization = await preferences.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.goal) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('preferences', 'goal', filter.goal),
        };
      }

      if (filter.tone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('preferences', 'tone', filter.tone),
        };
      }

      if (filter.style) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('preferences', 'style', filter.style),
        };
      }

      if (filter.topics) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('preferences', 'topics', filter.topics),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.preferences.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.preferences.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('preferences', 'goal', query),
        ],
      };
    }

    const records = await db.preferences.findAll({
      attributes: ['id', 'goal'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['goal', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.goal,
    }));
  }
};
