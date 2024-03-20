let nextUserId = 1;
let nextPostId = 1;

const users = [];
const posts = [];

const resolvers = {
  Query: {
    getUser: (parent, { id }) => users.find((user) => user.id === id),
    getPosts: () => posts,
  },
  Mutation: {
    createUser: (parent, { username, email }) => {
      const newUser = { id: String(nextUserId++), username, email };
      users.push(newUser);
      return newUser;
    },
    createPost: (parent, { content, userId }) => {
      const author = users.find((user) => user.id === userId);
      if (!author) {
        throw new Error("User not found");
      }
      const newPost = { id: String(nextPostId++), content, authorId: userId };
      posts.push(newPost);
      return newPost;
    },
  },
  User: {
    posts: (user) => posts.filter((post) => post.authorId === user.id),
  },
};

module.exports = resolvers;
