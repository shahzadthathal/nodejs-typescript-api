import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public static initModel(sequelize: Sequelize): typeof User {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'users',
                timestamps: true,
            }
        );
        return User;
    }
}

export default User;
