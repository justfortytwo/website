<script setup lang="ts">
import { packageGroups, packages } from '~/data/packages'
const inGroup = (id: string) => packages.filter((p) => p.group === id)
</script>
<template>
  <div class="groups">
    <section v-for="g in packageGroups" :key="g.id" class="g">
      <header>
        <h3>{{ g.label }}</h3>
        <p>{{ g.blurb }}</p>
      </header>
      <ul>
        <li v-for="p in inGroup(g.id)" :key="p.name">
          <span class="name">{{ p.name }}</span>
          <span class="pkg">{{ p.pkg }}</span>
          <span class="desc">{{ p.description }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<style scoped>
.groups{border-top:1px solid var(--rule)}
.g{display:grid;grid-template-columns:240px 1fr;gap:28px;padding:26px 0;border-bottom:1px solid var(--rule)}
h3{font-family:var(--font-mono);font-weight:400;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--bronze-3);margin-bottom:6px}
header p{font-size:14px;color:var(--mute)}
ul{list-style:none}
li{display:grid;grid-template-columns:110px 220px 1fr;gap:16px;padding:10px 0;border-bottom:1px solid var(--rule);align-items:baseline}
li:last-child{border-bottom:none}
.name{font-family:var(--font-serif);font-weight:500;font-size:20px}
.pkg{font-family:var(--font-mono);font-size:11.5px;color:var(--mute)}
.desc{font-size:14px;color:var(--ink-2);line-height:1.45}
@media (max-width:980px){
  .g{grid-template-columns:1fr;gap:12px}
  li{grid-template-columns:1fr;gap:2px}
}
</style>
