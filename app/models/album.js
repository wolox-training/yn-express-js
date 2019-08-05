module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'last_name'
      }
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'albums'
    }
  );
  return Album;
};
