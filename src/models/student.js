'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // One student has many marks
      Student.hasMany(models.Mark, {
        foreignKey: 'studentId',
        as: 'marks',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Student.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      age:{
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'Students',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true
    }
  );

  return Student;
};
