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

    <v-form ref="myForm" @submit="getData($event)">
      <v-text-field
        type="date"
        label="From"
        v-model="fromDataValue"
      ></v-text-field>
      <v-text-field type="date" label="To" v-model="toDataValue"></v-text-field>
      <v-select
        class="select-coins"
        v-model="selectedCoin"
        label="Select the Coin"
        :items="coinsArray"
        :rules="rules.required"
      ></v-select>
      <v-btn variant="tonal" type="submit"> Search </v-btn>
    </v-form>

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
    <section v-if="tradeCoins" class="trades-contanier">
      <TradeArea :array="apiData" />
    </section>
    <section v-if="formValid" class="no-trades">
      <div v-if="apiData.length === 0">
        <h3>No Trades</h3>
      </div>
    </section>
  </main>
</template>

<!-- -------------------------------------------------------------------------------------------- -->

<script>
import SideHeader from "./components/SideHeader.vue";
import TradeArea from "./components/TradeArea.vue";
import { coins } from "./utils/arrayCoins.js";
import { apiCall } from "./utils/apiCall.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "App",
  components: {
    TradeArea,
    SideHeader,
  },
  data() {
    return {
      apiData: [],
      fromDataValue: new Date(Date.now() - 86400 * 1000)
        .toISOString()
        .slice(0, 10),
      toDataValue: new Date(Date.now()).toISOString().slice(0, 10),
      selectedCoin: "",
      coinsArray: Object.keys(coins[0]),
      tradeCoins: false,
      formValid: false,
      rules: {
        required: [(value) => !!value || "Required."],
      },
    };
  },
  methods: {
    async getData(e) {
      e.preventDefault();
      if (!this.selectedCoin) {
        this.notify();
      } else {
        const fromDataValue = this.fromDataValue;
        const toDataValue = this.toDataValue;
        const epochDataFrom = Math.floor(
          new Date(fromDataValue).getTime() / 1000.0
        );
        const epochDataTo = Math.floor(
          new Date(toDataValue).getTime() / 1000.0
        );
        try {
          this.apiData = await apiCall(
            this.selectedCoin,
            "trades",
            epochDataFrom,
            epochDataTo
          );
          !this.apiData[0].amount;
        } catch (e) {
          this.notify2();
        }
        this.handleMaximumPrice();
        this.formValid = true;
      }
    },

    handleMaximumPrice() {
      this.showSumPrice = true;
      this.tradeCoins = this.apiData.length > 0;
    },
  },
  setup() {
    const notify = () => {
      toast("Coin is Required", {
        autoClose: 3000,
        type: "error",
      });
    };
    const notify2 = () => {
      toast("Date in 'to' cannot be less than in 'from'", {
        autoClose: 3000,
        type: "error",
      });
    };
    return { notify, notify2 };
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
  margin-top: 15px;
}

.no-trades {
  width: 80%;
  text-align: center;
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
.v-input {
  height: 80px;
  width: 200px;
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
    width: 85%;
    display: flex;
    flex-direction: row;
    margin: 0 0;
    gap: 15px;
  }
  main {
    width: 50vw;
  }
}
</style>
