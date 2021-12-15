module.exports = mongoose => {
    const weatherInfo = mongoose.model(
        "weatherInfo",
        mongoose.Schema(
            {
                title: String,
                temp: String,
                image: string
            },
            { timestamps: true }
        )
    );

    return weatherInfo;
};


module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            temp: String,
            image: string
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const weatherInfo = mongoose.model("weather", schema);
    return weatherInfo;
};