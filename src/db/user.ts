import { sequelize } from "./sequelize";
import { DataTypes, Model } from "sequelize";

class User extends Model { 
  public id!: number;
}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ci: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    girlfriend: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "user"
  }
);

export { User };