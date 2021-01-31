const { DataTypes } = require("sequelize");

const StreamerModel = (sequelize) => {
    const Streamer = sequelize.define(
        "User",
        {
            name: { type: DataTypes.STRING, allowNull: false },
            lastname: { type: DataTypes.STRING, allowNull: false },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                get(username) {
                    const rawValue = this.getDataValue(username);
                    return rawValue ? rawValue.toUpperCase() : null;
                },
                set(value) {
                    this.setDataValue("username", `username:${value}`);
                },
            },
            age: { type: DataTypes.INTEGER },
            tags: { type: DataTypes.STRING, allowNull: false },
        },
        { sequelize }
    );
    return Streamer;
};

module.exports = StreamerModel;
