# Sample gRPC Node.js News Server

## Overview

This repository contains a gRPC-based Node.js server implementing CRUD operations for a news list. It features a batched `GetNews` API, allowing efficient retrieval of multiple news items.

### Features

- **CRUD Operations**: Create, Read, Update, and Delete news items.
- **Batched News Retrieval**: Fetch multiple news items in a single request.
- **gRPC Interface**: Efficient and modern protocol for inter-service communication.

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Installation

To set up the project, run the following command:

```bash
npm install
```

## Running the Server

Start the server with:

```bash
node server
```

## gRPC API

The server uses the following gRPC API defined in `news.proto`:

```protobuf
syntax = "proto3";
import "google/protobuf/empty.proto";
package news;
message News {
  int32 id = 1;
  string title = 2;
  string body = 3;
  string postImage = 4;
}

service NewsService {
  rpc GetAllNews (google.protobuf.Empty) returns (NewsList) {}
  rpc GetNews (NewsId) returns (News) {}
  rpc GetMultipleNews (MultipleNewsId) returns (NewsList) {}
  rpc DeleteNews (NewsId) returns (google.protobuf.Empty) {}
  rpc EditNews (News) returns (News) {}
  rpc AddNews (News) returns (News) {}
}

message NewsId {
  int32 id = 1;
}

message MultipleNewsId {
  repeated NewsId ids = 1;
}

message NewsList {
  repeated News news = 1;
}
```

## License

This project is licensed under the MIT License.

* * *

© 2023 @ Tailcall
