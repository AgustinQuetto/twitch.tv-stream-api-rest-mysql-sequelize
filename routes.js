const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("streamers", "root", "developer", {
    host: "localhost",
    dialect: "mysql",
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

const StreamerModel = require("./models/StreamerModel");
const StreamerModelInstance = StreamerModel(sequelize);
sequelize.sync({ force: true });

const StreamerController = require("./controllers/StreamerController");
const StreamerService = require("./services/StreamerService");

const StreamerServiceInstance = new StreamerService(StreamerModelInstance);
const StreamerControllerIntance = new StreamerController(
    StreamerServiceInstance
);

const routes = (app) => {
    app.get("/streamers", (req, res) => {
        StreamerControllerIntance.find(req, res);
    });

    app.get("/streamer/:id", (req, res) => {
        StreamerControllerIntance.findById(req, res);
    });

    app.post("/streamer", (req, res) =>
        StreamerControllerIntance.create(req, res)
    );

    app.put("/streamer/:id", (req, res) => {
        StreamerControllerIntance.update(req, res);
    });

    app.delete("/streamer/:id", (req, res) => {
        StreamerControllerIntance.deleteById(req, res);
    });
};

module.exports = routes;
