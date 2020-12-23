export const state = () => ({
  notes: [],
  currentUser: null,
  openNotesSidebar: true,
  updatingNote: null
})

export const mutations = {
  setCurrentUser(state, payload) {
    payload === null ? state.currentUser = payload : state.currentUser = Object.assign({}, payload)
  },
  setNotesSidebarState(state, payload) {
    state.openNotesSidebar = payload
  },
  cleanUpdatingNote(state) {
    console.log('clean')
    state.updatingNote = null
  },
  setUpdatingNote(state, payload) {
    state.updatingNote = Object.assign({}, payload)
  },
  saveUpdatedNote(state, payload) {
    const index = state.notes.findIndex(note => note.id === payload.id)
    state.notes[index].title = payload.title
    state.notes[index].content = payload.content
    state.notes[index].updated_at = payload.updated_at
  },
  getNotes(state, payload) {
    state.notes = payload
  },
  setNewNote(state, payload) {
    state.notes.unshift(payload)
  },
  removeNote(state, payload) {
    state.notes = state.notes.filter(note => note.id !== payload)
  }
}

export const actions = {
  async PUT_NOTE({commit, state}, id) {
    try {
      // update db
      const editedNote = {
        method: "put",
        body: {
          id,
          title: state.updatingNote.title,
          content: state.updatingNote.content,
          created_at: String(Date.now()),
          updated_at: String(Date.now())
          }
      }
      const data = await this.$axios.$post('/api/notes', editedNote)
      const updatedNote = { ...data.response }
      commit('saveUpdatedNote', updatedNote)
      commit('cleanUpdatingNote')
    } catch (error) {
      console.log(error)
    }
  },
  async POST_NOTE({commit}) {
    try {
      const newNote = {
        method: "post",
        body: {
          title: "Una magnifica nota nueva",
          content: "<h1>Una magnifica nota nueva</h1>",
          created_at: String(Date.now()),
          updated_at: String(Date.now())
          }
      }
      const data = await this.$axios.$post('/api/notes', newNote)
      if (data.status !== 'created') throw new Error('La nota no se creo correctamente')
      const createdNote = { ...data.response }
      commit('setNewNote', createdNote)
      $nuxt.$router.push('/notes/' + createdNote.id)
    } catch (error) {
      console.log('Hubo un error', error)
    }
  },
  async DELETE_NOTE({commit}, id) {
    try {
      const noteReq = {
        method: "delete",
        body: { id }
      }
      const res = await this.$axios.$post('/api/notes', noteReq)
      if (res.status !== 'ok') throw new Error('La nota no se elimino correctamente')
      $nuxt.$router.push('/notes')
      commit('removeNote', id)
    } catch (error) {
      console.log(error)
    }
  }
}