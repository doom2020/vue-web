<template>
  <div class="forget">
  {{message}}
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    let message = ref("this is forget password page")
    return {
      message
    }
  }
}
</script>