import db from "./db.js";

export const resolvers = {
  // In Query we put main entry point for the query
  // all the methods here will get three argument parent, args and context
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  // here we put sub query so say from main query/sub query we got Game returned and we want to also populate reviews in them we can do like this. Here `parent` refers to the parent query and previous query which return Game(in first example) will be the parent
  // any query which return Game and wants to populate reviews will get hit here, this is how we are able to nest one field inside other i.e. wheather we get Game from main query or subquery if we need to populate reviews we can do here
  // we usually put the feilds which are reference of other types for instance we are referencing Review type via reviews property
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  //   Mutation - edit or delete data
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      db.games.push({
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      });
      return db.games;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return {
            ...game,
            ...args.updates,
          };
        } else {
          game;
        }
      });

      return db.games.find((game) => game.id === args.id);
    },
  },
};
