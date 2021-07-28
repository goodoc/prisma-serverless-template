import { queryType, mutationType } from 'nexus';

const quries = queryType({
  definition(t) {
    t.crud.users();
    t.crud.posts();
  },
})

const mutations = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOnePost();
  }
})

export default [
  quries,
  mutations
]
