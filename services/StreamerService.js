class StreamerService {
    constructor(streamerModel) {
        this.streamerModel = streamerModel;
    }

    async find(query, select) {
        const params = {
            where: query,
        };
        if (select) {
            params.attributes = select.split(",");
        }
        return this.streamerModel.findAll(params);
    }

    async findById(id) {
        return this.streamerModel.findOne({ where: { id: parseInt(id) } });
    }

    async create(data) {
        if (data.tags) data.tags = data.tags.join(",");
        return this.streamerModel.create(data);
    }

    async updateById(id, data) {
        if (data.tags) data.tags = data.tags.join(",");
        return this.streamerModel.update(data, { where: { id: id } });
    }

    async deleteById(id) {
        return this.streamerModel.destroy({ where: { id: id } });
    }
}

module.exports = StreamerService;
