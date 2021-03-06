<script>
import { GlButton, GlModal, GlModalDirective } from '@gitlab/ui';
import { escape } from 'lodash';
import { s__, sprintf } from '~/locale';

export default {
  components: {
    GlModal,
    GlButton,
  },
  directives: {
    'gl-modal': GlModalDirective,
  },
  props: {
    deleteWikiUrl: {
      type: String,
      required: true,
      default: '',
    },
    pageTitle: {
      type: String,
      required: true,
      default: '',
    },
    csrfToken: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    modalId() {
      return 'delete-wiki-modal';
    },
    message() {
      return s__('WikiPageConfirmDelete|Are you sure you want to delete this page?');
    },
    title() {
      return sprintf(
        s__('WikiPageConfirmDelete|Delete page %{pageTitle}?'),
        {
          pageTitle: escape(this.pageTitle),
        },
        false,
      );
    },
  },
  methods: {
    onSubmit() {
      window.onbeforeunload = null;
      this.$refs.form.submit();
    },
  },
};
</script>

<template>
  <div class="d-inline-block">
    <gl-button
      v-gl-modal="modalId"
      category="primary"
      variant="danger"
      data-qa-selector="delete_button"
    >
      {{ __('Delete') }}
    </gl-button>
    <gl-modal
      :title="title"
      :action-primary="{
        text: s__('WikiPageConfirmDelete|Delete page'),
        attributes: { variant: 'danger', 'data-qa-selector': 'confirm_deletion_button' },
      }"
      :modal-id="modalId"
      title-tag="h4"
      @ok="onSubmit"
    >
      {{ message }}
      <form ref="form" :action="deleteWikiUrl" method="post" class="js-requires-input">
        <input ref="method" type="hidden" name="_method" value="delete" />
        <input :value="csrfToken" type="hidden" name="authenticity_token" />
      </form>
    </gl-modal>
  </div>
</template>
