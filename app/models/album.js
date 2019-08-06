module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      albumId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'album_id'
      },
      name: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
      }
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'albums'
    }
  );

  Album.associate = models => {
    Album.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Album;
};
