export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        # Here we are telling games may have review which has type of Review i.e. reviews might be empty array but if there is element inside reviews then it should be of type Review
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    # types for Query
    type Query {
        games: [Game]
        game(id: ID!): Game
        reviews: [Review]
        review(id: ID!): Review
        authors: [Author]
        author(id: ID!): Author
    }

    # types for Mutation
    type Mutation {
        deleteGame(id: ID): [Game!]
        # here we have set the argument as game so we can access these fields using game in the args of Mutation method addGame
        addGame(game: AddGameInput): [Game!]!
        updateGame(id: ID!, updates: EditGameInput): Game
    }

    # type of data that we would get form the client
    # on client side we have to send data something like:
    # {
    #     "game": {
    #     "title": "Hello", 
    #     "platform": ["ps4"] 
    #     }
    # }
    input AddGameInput {
        title: String!
        platform: [String!]
    }

    # edit game inputs
    input EditGameInput {
        title: String
        platform: [String!]
    }

    `;
