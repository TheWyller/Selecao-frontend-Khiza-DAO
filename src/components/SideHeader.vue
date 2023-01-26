<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
  sub_msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <p>{{ sub_msg }}</p>
      <a href="https://www.khizadao.com/" target="_blank" rel="noopener"
        >See More</a
      >
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
p {
  margin-bottom: 15px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
