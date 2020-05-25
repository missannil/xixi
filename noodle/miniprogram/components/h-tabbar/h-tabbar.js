// components/h-tabbar/index.js
Component({
  lifetimes: {
    attached: function () {},
    moved: function () {},
    detached: function () {},
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    tabbarList: {
      type: Array,
      value: []
    },
    active: {
      type: Number,
      value: 0
    }
  },
  data: {
    // pageIndex:0
  },
  methods: {
    changeIndex(e) {
      const active = e.currentTarget.dataset.index;
      if (active != this.data.active) {
        this.setData({
          active
        });
        this.triggerEvent('changeActive', {
          active
        })
      }

    }
  }

})