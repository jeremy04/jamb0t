module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        username: DataTypes.STRING,
        user_id: DataTypes.STRING,
        spin_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        last_spin: DataTypes.DATE,
        joined: DataTypes.DATE,
        upvotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        downvotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        grabbed_by_user: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        grabbed_by_others: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {

    });
};
