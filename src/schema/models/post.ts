import { objectType } from 'nexus';

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
  },
});
export default Post;