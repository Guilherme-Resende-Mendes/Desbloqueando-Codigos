const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tecnico = require('./Tecnico');

const Conserto = sequelize.define('Conserto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numeroOS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  protocolo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nomeCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefoneCliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  equipamentoUtilizado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricaoProblema: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pendente"
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// Associação com Técnico
Conserto.belongsTo(Tecnico, { as: "responsavel" });

// Métodos de instância
Conserto.criarConserto = async function (numeroOS,protocolo,nomeCliente,telefoneCliente,equipamentoUtilizado,descricaoProblema,responsavelId) {
  return await Conserto.create({ numeroOS, protocolo, nomeCliente, telefoneCliente, equipamentoUtilizado, descricaoProblema, responsavelId });
};

Conserto.prototype.getOS = function () {
  return this.numeroOS;
};

Conserto.prototype.getProtocolo = function () {
  return this.protocolo;
};

Conserto.prototype.atualizarStatus = async function (novoStatus) {
  this.status = novoStatus;
  await this.save();
};

Conserto.prototype.apagarConserto = async function () {
  await this.destroy();
};

Conserto.prototype.getData = async function () {
  await this.createdAt;
}

module.exports = Conserto;
