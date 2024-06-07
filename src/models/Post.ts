import { Model, DataTypes, Sequelize } from 'sequelize';

class Post extends Model {
    public id!: number;
    public title!: string;
    public slug!: string;
    public description!: string;
    public status!: number;
    public category_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public static initModel(sequelize: Sequelize): typeof Post {
        Post.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                slug: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                category_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.fn('now'),
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.fn('now'),
                },
            },
            {
                sequelize,
                tableName: 'posts',
                timestamps: true,
            }
        );
        return Post;
    }
}

export default Post;
