'use strict';

const { Model } = require('sequelize');

const { MAINTENANCE_STATUS_CODE, MAINTENANCE_STATUS_KEYS } = require('../utils/maintenance');

module.exports = (sequelize, DataTypes) => {
    class Maintenance extends Model {
        static associate(models) {
            // 1 đơn bảo dưỡng thuộc về 1 kỹ thuật viên
            Maintenance.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });

            // 1 đơn bảo dưỡng thuộc về 1 chiếc xe
            Maintenance.belongsTo(models.Motor, {
                foreignKey: 'motor_id',
                as: 'motor',
            });

            // 1 đơn bảo dưỡng có nhiều chi tiết bảo dưỡng
            Maintenance.hasMany(models.MaintenanceDetail, {
                foreignKey: 'maintenance_id',
                as: 'maintenanceDetails',
            });

            // 1 đơn bảo dưỡng tương ứng với 1 lịch hẹn
            Maintenance.belongsTo(models.Appointment, {
                foreignKey: 'appointment_id',
                as: 'appointment',
            });
        }
    };

    Maintenance.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        status: {
            type: DataTypes.ENUM(...MAINTENANCE_STATUS_KEYS),
            defaultValue: MAINTENANCE_STATUS_CODE['RECEIVING'],
            allowNull: false,
        },
        maintenance_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        // Ghi chú tình trạng xe trước khi bảo dưỡng
        notes_before: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Ghi chú tình trạng xe sau khi bảo dưỡng
        notes_after: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Phần trăm mòn trước khi bảo dưỡng
        wear_percentage_before: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Phần trăm mòn sau khi bảo dưỡng
        wear_percentage_after: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Id kỹ thuật viên thực hiện bảo dưỡng ( role = 'TECHNICIAN' )
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        motor_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        appointment_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Maintenance',
        tableName: 'Maintenances',
    });

    return Maintenance;
}