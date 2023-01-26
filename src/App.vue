<template>
  <header>
    <img alt="Khiza logo" class="logo" src="./assets/LOGO_KHIZA_06.png" />

    <div class="wrapper">
      <SideHeader
        msg="The web3 venture"
        sub_msg="KHIZA, in the language of Brazil's first people, means “all together"
      />
    </div>
  </header>
  <hr />
  <main>
    <h3>Do you want to know the history of the trades done?</h3>
    <form action="" @submit="getData($event)">
      <label for="from">From:</label>
      <input type="date" v-model="fromDataValue" name="from" />
      <label for="to">To:</label>
      <input type="date" v-model="toDataValue" name="to" />
      <select v-model="selectedCoin" required>
        <option disabled value="">Select a Coin</option>
        <option v-for="(item, i) in coinsArray" v-bind:key="i">
          {{ item }}
        </option>
      </select>
      <button type="submit">Search</button>
    </form>
    <span class="total-value" v-if="tradeCoins">
      In this period was traded
      {{
        new Intl.NumberFormat("us", {
          style: "currency",
          currency: "USD",
        }).format(
          apiData.reduce((acc, value) => acc + value.price, 0).toFixed(2)
        )
      }}
      dollars
    </span>
    <section :v-if="tradeCoins" class="trades-contanier">
      <TradeArea :array="apiData" />
    </section>
  </main>
</template>

<!-- -------------------------------------------------------------------------------------------- -->

<script>
import SideHeader from "./components/SideHeader.vue";
import TradeArea from "./components/TradeArea.vue";
import { coins } from "./utils/arrayCoins.js";
import { apiCall } from "./utils/apiCall.js";

export default {
  name: "App",
  components: {
    TradeArea,
    SideHeader,
  },
  data() {
    return {
      apiData: [],
      fromDataValue: new Date(Date.now()).toISOString().slice(0, 10),
      toDataValue: "",
      selectedCoin: "",
      coinsArray: Object.keys(coins[0]),
      tradeCoins: false,
    };
  },
  methods: {
    async getData(e) {
      e.preventDefault();
      const fromDataValue = this.fromDataValue;
      const toDataValue = this.toDataValue;
      const epochDataFrom = Math.floor(
        new Date(fromDataValue).getTime() / 1000.0
      );
      const epochDataTo = Math.floor(new Date(toDataValue).getTime() / 1000.0);
      this.apiData = await apiCall(
        this.selectedCoin,
        "trades",
        epochDataFrom,
        epochDataTo
      );
      this.handleMaximumPrice();
    },

    handleMaximumPrice() {
      this.showSumPrice = true;
      this.tradeCoins = this.apiData.length > 0;
    },
  },
};
</script>

<!-- -------------------------------------------------------------------------------------------- -->

<style scoped>
header {
  line-height: 1.5;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.trades-contanier {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  overflow-x: scroll;
}
hr {
  margin: 20px 0;
}
.logo {
  position: fixed;
  width: 100vw;
  height: 100vw;
  left: -3vw;
  bottom: 0vh;

  filter: blur(5px);
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

label {
  margin-right: 5px;
}

input,
select,
button {
  height: 30px;
  width: 150px;
  margin-right: 10px;
}
button {
  color: rgb(13, 22, 32);
  font-weight: bolder;
  border: none;
  background: hsla(160, 100%, 37%, 1);
}

button:hover {
  background: hsla(160, 100%, 37%, 0.2);
  cursor: pointer;
}

.total-value {
  width: 100%;
  height: 30px;
  font-size: 20px;
}

@media (min-width: 768px) {
  .logo {
    position: fixed;
    width: 100vw;
    height: 100vw;
    left: -3vw;
    bottom: -25vh;

    filter: blur(9px);
  }
}

@media (min-width: 1024px) {
  hr {
    display: none;
  }
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    position: fixed;
    width: 100vw;
    height: 100vw;
    left: -3vw;
    bottom: -40vh;

    filter: blur(20px);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .trades-contanier {
    display: flex;
    width: 90%;
    overflow-x: scroll;
  }

  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(216, 216, 216);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: hsla(160, 100%, 37%, 1);
    border-radius: 10px;
    width: 40px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 0 0;
  }
  main {
    width: 50vw;
  }
}
</style>
