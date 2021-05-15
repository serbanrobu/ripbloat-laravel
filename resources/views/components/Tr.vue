<template>
  <tr>
    <slot />
  </tr>
</template>

<style lang="scss" scoped>
thead > tr, tr:nth-child(even) {
  @apply bg-neutral-50;
}
</style>
