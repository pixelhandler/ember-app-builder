'use-strict';

module.exports = App.AdminCreateController = Ember.ObjectController.extend({

  isPreviewing: false,

  createSlug: function () {
    var slug = this.get('slug');
    var title = this.get('title');
    if (!title || slug) { return false; }
    this.set('slug', this.slugify(this.get('title')));
  },

  slugify: function (title) {
    if (!title) { return title; }
    var slug = title.toLowerCase().dasherize();
    slug = slug.replace(/\(|\)|\[|\]|:|\./g, '');
    return slug;
  },

  actions: {
    edit: function () {
      this.set('isPreviewing', false);
    },

    preview: function () {
      this.set('isPreviewing', true);
    },

    save: function () {
      this.set('isEditing', false);
      return true; // bubble
    },

    titleChanged: function () {
      this.createSlug();
    }
  }
});
