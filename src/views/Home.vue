<template>
  <div class="home">
  {{message}}
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const message = ref("this is home page")
    return {
      message
    }
  },
  components: {
  }
}
</script>
