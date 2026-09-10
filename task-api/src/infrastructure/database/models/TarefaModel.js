const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');
const UsuarioModel = require('./UsuarioModel');

class TarefaModel extends Model {}

TarefaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDENTE',
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'usuario_id',
      references: {
        model: UsuarioModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Tarefa',
    tableName: 'tarefas',
    timestamps: true,
  },
);

// Relacionamento: um usuário possui várias tarefas.
UsuarioModel.hasMany(TarefaModel, { foreignKey: 'usuarioId', as: 'tarefas' });
TarefaModel.belongsTo(UsuarioModel, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = TarefaModel;
