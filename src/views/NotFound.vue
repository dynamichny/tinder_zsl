<template>
  <div></div>
</template>

<script>
export default {
  name: "NotFound",
  created() {
    this.$router.push({ path: "/about" });
  }
};
</script>
