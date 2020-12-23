<template>
  <section class="column" :class="[openNotesSidebar ? 'is-four-fifths' : 'is-11']">

    <div v-if="editor">
      <div class="tools px-3 mb-3 is-flex is-justify-content-space-between">

        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="buttons mb-0">
            <b-button 
              @click="commands.bold" 
              :type="{'is-light' : isActive.bold() }" 
              icon-right="format-bold"
            ></b-button>
            <b-button 
              @click="commands.italic" 
              :type="{'is-light' : isActive.italic() }" 
              icon-right="format-italic"
            ></b-button>
            <b-button 
              @click="commands.strike" 
              :type="{'is-light' : isActive.strike() }" 
              icon-right="format-strikethrough"
            ></b-button>
            <b-button 
              @click="commands.underline" 
              :type="{'is-light' : isActive.underline() }" 
              icon-right="format-underline"
            ></b-button>
            <b-button 
              @click="commands.paragraph" 
              :type="{'is-light' : isActive.paragraph() }" 
              icon-right="format-paragraph"
            ></b-button>
            <b-button 
              @click="commands.heading({level: 1})" 
              :type="{'is-light' : isActive.heading({level: 1}) }" 
              icon-right="format-header-1"
            ></b-button>
            <b-button 
              @click="commands.heading({level: 2})" 
              :type="{'is-light' : isActive.heading({level: 2}) }" 
              icon-right="format-header-2"
            ></b-button>
            <b-button 
              @click="commands.heading({level: 3})" 
              :type="{'is-light' : isActive.heading({level: 3}) }" 
              icon-right="format-header-3"
            ></b-button>
            <b-button 
              @click="commands.bullet_list()" 
              :type="{'is-light' : isActive.bullet_list() }" 
              icon-right="format-list-bulleted"
            ></b-button>
            <b-button 
              @click="commands.ordered_list()" 
              :type="{'is-light' : isActive.ordered_list() }" 
              icon-right="format-list-numbered"
            ></b-button>
            <b-button 
              @click="commands.horizontal_rule()" 
              :type="{'is-light' : isActive.horizontal_rule() }" 
              icon-right="format-vertical-align-bottom"
            ></b-button>
            <b-button type="is-danger" @click="deleteConfirm"
            >Eliminar nota</b-button>
            
          </div>
        </editor-menu-bar>
        <div class="is-flex is-align-items-center updateStatus" @click="PUT_NOTE($route.params.id)">
          <b-button :disabled="!updatingNote" type="is-primary" class="mr-4 btnSave">Guardar Nota</b-button>
          <div class="updateInfo is-flex is-align-items-center">
            <b-icon
              class="mr-2"
              :icon="!updatingNote ? 'check' : 'close'"
              :type="!updatingNote ? 'is-primary' : 'is-danger'"
              size="is-small">
            </b-icon>
            <p>{{ !updatingNote ? 'Actualizado': 'Sin actualizar'}}</p>
          </div>
        </div>
      </div>

      <client-only>
        <editor-content
          class="has-background-white-bis has-text-grey-dark editor is-family-secondary" 
          :editor="editor" />
      </client-only>
    </div>

  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline,
} from 'tiptap-extensions'


export default {
  data() {
    return {
      editor: null
    }
  },
  props: ['singleNote'],
  components: {
    EditorContent,
    EditorMenuBar
  },
  computed: {
    ...mapState(['notes', 'openNotesSidebar', 'updatingNote'])
  },
  methods: {
    ...mapMutations(['setNotesSidebarState', 'cleanUpdatingNote', 'setUpdatingNote']),
    ...mapActions(['PUT_NOTE', 'DELETE_NOTE']),
    deleteConfirm() {
      this.$buefy.dialog.confirm({
        message: '¿Estás seguro de eliminar esta nota?',
        type: 'is-danger',
        onConfirm: () => this.DELETE_NOTE(this.$route.params.id)
      })
    }
  },
  watch: {
    $route(to, from) {
      // find current note
      const note = this.notes.find(el => el.id === to.params.id)
      // if does note exist, back to /notes
      if (!note) return this.$router.push('/notes')
      // else set content
      this.editor.setContent(note.content)
      // clean previous vuex current note
      this.cleanUpdatingNote()
      // on tablet screen, hide sidebar when open another note
      if (document.documentElement.clientWidth < 1024) {
        this.setNotesSidebarState(false)
      }
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.singleNote.content,
      extensions: [
        new BulletList(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
      ],
      onUpdate: ({ getHTML, getJSON }) => {
        const newContent = getHTML()
        const jsonContent = getJSON()
        this.setUpdatingNote({
          title: jsonContent.content[0].content[0].text,
          content: newContent,
          updated_at: String(Date.now()),
          id: this.$route.params.id
        })
      },
    })
    if (document.documentElement.clientWidth < 1024) {
      this.setNotesSidebarState(false)
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
  .editor {
    border-radius: 20px;
    box-shadow: 0 0 40px hsl(0, 0%, 86%);
    padding: 3rem 4rem;
    min-height: 100vh;
    position: relative;
    z-index: 1;
    h1 { font-size: 3rem; }
    h2 { font-size: 2.5rem; }
    h3 { font-size: 2rem; }
    p { font-size: 1.6rem; }
    hr { border-top: 1px solid hsl(0, 0%, 86%) }
  }
  .editor::after {
    content: "";
    background: url('~static/bg-1.svg') no-repeat right bottom;
    background-size: 40%;
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 2%;
    right: 2%;
    position: absolute;
    z-index: -1;
  }
  .ProseMirror {
    outline: none;
  }
  ul {
    padding-left: 20px;
    li {
      list-style: circle;
    }
  }

  @media all and (max-width: 1024px) {
    .editor {
      padding: 1.5rem 2rem;
      p {
        font-size: 1.4rem;
      }
      h1 { font-size: 2.5rem; }
      h2 { font-size: 2rem; }
      h3 { font-size: 1.7rem; }
    }
    .tools .buttons {
      overflow: auto;
      flex-wrap: nowrap;
    }
    .updateStatus {
      position: absolute;
      top: 20px;
      right: 32px;
    }
    .btnSave {
      position: fixed;
      bottom: 10px;
      right: 0;
      z-index: 2;
    }
  }
</style>