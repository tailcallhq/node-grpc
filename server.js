const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
var protoLoader = require("@grpc/proto-loader");
const addReflection =  require('grpc-server-reflection').addReflection;

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
// Enable Reflection
addReflection(server, "./descriptor_set.bin");

const NEWS = [
  { id: 1, title: "Note 1", body: "Content 1", postImage: "Post image 1" },
  { id: 2, title: "Note 2", body: "Content 2", postImage: "Post image 2" },
  { id: 3, title: "Note 3", body: "Content 3", postImage: "Post image 3" },
  { id: 4, title: "Note 4", body: "Content 4", postImage: "Post image 4" },
  { id: 5, title: "Note 5", body: "Content 5", postImage: "Post image 5" },
];

server.addService(newsProto.news.NewsService.service, {
  getAllNews: (_, callback) => {
    callback(null, { news: NEWS });
  },
  getNews: (_, callback) => {
    const newsId = _.request.id;
    const newsItem = NEWS.find(({ id }) => newsId == id);
    callback(null, newsItem);
  },
  getMultipleNews: (service, callback) => {
    const ids = new Set(service.request.ids.map(e => e.id));
    const result = [];

    for (const news of NEWS) {
      if (ids.has(news.id)) {
        result.push(news);
      }
    }

    callback(null, { news: result });
  },
  deleteNews: (_, callback) => {
    const newsId = _.request.id;
    NEWS = NEWS.filter(({ id }) => id !== newsId);
    callback(null, {});
  },
  editNews: (_, callback) => {
    const newsId = _.request.id;
    const newsItem = NEWS.find(({ id }) => newsId == id);
    newsItem.body = _.request.body;
    newsItem.postImage = _.request.postImage;
    newsItem.title = _.request.title;
    callback(null, newsItem);
  },
  addNews: (call, callback) => {
    let _news = { id: Date.now(), ...call.request };
    NEWS.push(_news);
    callback(null, _news);
  },
});


server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server at port:", port);
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);