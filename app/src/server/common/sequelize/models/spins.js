module.exports = function (sequelize, DataTypes) {
    return sequelize.define('spins', {
        artist: DataTypes.STRING,
        title: DataTypes.STRING,
        track_id: DataTypes.STRING,
        spun_by: DataTypes.STRING,
        spun_date: DataTypes.DATE,
        spin_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        upvotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        downvotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        grabs: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {

    });
};
