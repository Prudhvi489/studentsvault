'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Mark extends Model {
    static associate(models) {
      // One mark belongs to one student
      Mark.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Mark.init(
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      marks: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'id'
        }
      },
      examId:{
        type: DataTypes.INTEGER,
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
      modelName: 'Mark',
      tableName: 'Marks',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true
    }
  );

  return Mark;
};
