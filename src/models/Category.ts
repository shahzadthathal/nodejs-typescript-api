import { Model, DataTypes, Sequelize } from 'sequelize';

class Category extends Model {
    public id!: number;
    public name!: string;
    public slug!: string;

    public static initModel(sequelize: Sequelize): typeof Category {
        Category.init(
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
                slug: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize,
                tableName: 'categories',
                timestamps: false,
            }
        );
        return Category;
    }
}

export default Category;
