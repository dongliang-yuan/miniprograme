Component({
  properties: {
    route: {
      type: String,
      value: '',
    },
    price: {
      type: String,
      value: '0.00',
    },
    ticketId: {
      type: String,
      value: '',
    },
  },

  methods: {
    onClick() {
      this.triggerEvent('click', {
        ticketId: this.data.ticketId,
        route: this.data.route,
        price: this.data.price,
      });
    },
  },
});


