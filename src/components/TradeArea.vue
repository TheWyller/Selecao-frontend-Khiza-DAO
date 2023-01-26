<template>
  <section class="trade-contanier" v-for="(item, i) in array" v-bind:key="i">
    <TradeItem :itemObject="item" :numId="i"></TradeItem>
  </section>
</template>

<!-- -------------------------------------------------------------------------------------------- -->

<script>
import TradeItem from "./TradeItem.vue";

export default {
  name: "TradeArea",
  props: {
    array: {
      type: Array,
      required: true,
    },
  },
  components: {
    TradeItem,
  },
};
</script>

<!-- -------------------------------------------------------------------------------------------- -->

<style scoped>
.trade-contanier {
  border: solid 1px black;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
}
span {
  width: 250px;
}
</style>
