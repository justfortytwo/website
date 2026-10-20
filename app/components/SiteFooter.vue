<script setup lang="ts">
import { site } from '~/data/site'
import { pictureCredits } from '~/data/credits'
</script>
<template>
  <footer>
    <div class="wrap row">
      <span>{{ site.footer.copyright }}</span>
      <div class="f-links">
        <NuxtLink v-for="l in site.footer.links" :key="l.href" :to="l.href">{{ l.label }}</NuxtLink>
      </div>
      <span>{{ site.footer.disclaimer }}</span>
    </div>
    <p class="wrap credits">Pictures, via Wikimedia Commons:
      <template v-for="(c, i) in pictureCredits" :key="c.source">
        <a :href="c.source">{{ c.title }}</a><template v-if="c.creator"> by {{ c.creator }}</template>, <a :href="c.licenceUrl">{{ c.licence }}</a><template v-if="i < pictureCredits.length - 1">; </template><template v-else>.</template>
      </template>
    </p>
  </footer>
</template>
<style scoped>
footer{border-top:1px solid var(--rule);padding:26px 0;font-family:var(--font-mono);font-size:13px;color:var(--mute)}
.row{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.f-links{display:flex;flex-wrap:wrap;gap:6px 18px}
.f-links a:hover{color:var(--bronze-3)}
.credits{font-family:var(--font-serif);font-size:15px;line-height:1.5;margin-top:18px;color:var(--ink-2)}
.credits a{border-bottom:1px solid var(--rule)}
.credits a:hover{color:var(--bronze-3);border-bottom-color:var(--bronze-3)}
</style>
