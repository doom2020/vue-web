<template>
  <div class="forget">
  {{message}}
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Forget',
  setup() {
    const message = ref("this is forget password page")
    return {
      message
    }
  }
}
</script>