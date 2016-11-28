define([
  'coreJS/adapt'
], function (Adapt) {
  var GoogleAnalytics = _.extend({
    initialize: function () {
      this.listenToOnce(Adapt, "router:location", this.onAdaptInitialize);
    },
    onAdaptInitialize: function () {
      if (!this.checkIsEnabled()) return;
      this.setupEventListeners();
    },
    checkIsEnabled: function () {
      var courseGA = Adapt.course.get('_analytics');
      if (!courseGA || !courseGA._isEnabled) return false;
      if (!Adapt.offlineStorage) return false;
      return true;
    },
    setupEventListeners: function () {
      var id = Adapt.course.get('_analytics')
        .id;
      window.ga = window.ga || function () {
        (ga.q = ga.q || [])
        .push(arguments)
      };
      ga.l = +new Date;
      ga('create', id, 'auto');
      ga('require', 'eventTracker', {
        events: ['click', 'mouseover']
      });
      ga('require', 'outboundLinkTracker');
      ga('require', 'urlChangeTracker');
      ga('require', 'pageVisibilityTracker');
      ga('send', 'pageview');
      this.listenTo(Adapt, 'pageView:postRender', this.setupGA);
    },
    setupGA: function () {
      var oldTitle = document.title;
      window.setInterval(function () {
        if (document.title !== oldTitle) {
          oldTitle = document.title;
          ga('set', 'title', oldTitle);
          ga('set', 'page', location.pathname + location.hash);
          ga('send', 'pageview');
        }
      }, 100); //check every 100ms

    }
  }, Backbone.Events)
  GoogleAnalytics.initialize();
});
