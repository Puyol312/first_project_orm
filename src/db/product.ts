import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

class Product extends Model {
  public id!: number;
}
Product.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // no permite negativos
      }
    },
    description: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "product"
  }
);

export { Product }