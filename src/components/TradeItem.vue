<template>
  <div class="details">
    <h2>Trade {{ numId + 1 }}</h2>
    <h3>{{ Object.keys(itemObject)[0] }}</h3>
    <p>{{ itemObject.amount }}</p>
    <h3>{{ Object.keys(itemObject)[1] }}</h3>
    <p>
      {{
        new Date(itemObject.date * 1000).toLocaleDateString(
          undefined,
          optionsTime
        )
      }}
    </p>
    <h3>{{ Object.keys(itemObject)[2] }}</h3>
    <p>
      {{
        new Intl.NumberFormat("us", {
          style: "currency",
          currency: "USD",
        }).format(itemObject.price.toFixed(2))
      }}
    </p>
    <h3>{{ Object.keys(itemObject)[3] }}</h3>
    <p>{{ itemObject.tid }}</p>
    <h3>{{ Object.keys(itemObject)[4] }}</h3>
    <p>{{ itemObject.type }}</p>
  </div>
</template>

<!-- -------------------------------------------------------------------------------------------- -->

<script>
export default {
  name: "TradeItem",
  data() {
    return {
      optionsTime: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    };
  },
  props: {
    itemObject: {
      type: Object,
      required: true,
    },
    numId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<!-- -------------------------------------------------------------------------------------------- -->

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
}

.details {
  width: 250px;
  padding: 15px;
  background-color: rgb(13, 22, 32);
  border-radius: 10px;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}
h3,
p {
  text-transform: capitalize;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
