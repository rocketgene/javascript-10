'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'first name is null. Please enter first name'
        },
        notEmpty: {
          msg: 'first name is empty. Please enter first name'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'last name is null. Please enter last name'
        },
        notEmpty: {
          msg: 'last name is empty. Please enter last name'
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: 'This email already exists'
      },
      validate: {
        isEmail: {
          msg: 'please enter a valid email',
        },
        notNull: {
          msg: 'email is null. Please enter email'
        },
        notEmpty: {
          msg: 'email is empty. Please enter email'
        }
      }
    },
    confirmedPassword: {
      type: Sequelize.VIRTUAL,  
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A confirmed assword is required'
        },
        notEmpty: {
          msg: 'Please provide a confirmed password'
        },
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(val) {
        if ( val === this.confirmedPassword ) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        },
        notEmpty: {
          msg: 'Please provide a password'
        },
      }
    }
    
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return User;
};