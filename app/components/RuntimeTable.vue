<script setup lang="ts">
import { runtimeTable } from '~/data/runtimes'
</script>
<template>
  <div>
    <table class="rt">
      <caption class="sr">Runtime support today</caption>
      <thead><tr><th scope="col">Runtime</th><th scope="col">Status</th><th scope="col">Notes</th></tr></thead>
      <tbody>
        <tr v-for="r in runtimeTable" :key="r.name">
          <th scope="row">{{ r.name }}</th>
          <td><span class="pill" :class="r.state === 'supported' ? 'ok' : 'edge'"><span class="dot"></span>{{ r.state === 'supported' ? 'SUPPORTED' : 'NOT SUPPORTED' }}</span></td>
          <td>{{ r.body }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.rt{width:100%;border-collapse:collapse;border:1px solid var(--rule)}
.sr{position:absolute;left:-9999px}
th,td{text-align:left;vertical-align:top;padding:16px 18px;border-bottom:1px solid var(--rule);font-size:15px;color:var(--ink-2)}
thead th{font-family:var(--font-mono);font-weight:400;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:var(--mute)}
tbody th{font-family:var(--font-serif);font-weight:500;font-size:22px;color:var(--ink);white-space:nowrap}
@media (max-width:760px){
  .rt,.rt tbody,.rt tr,.rt th,.rt td{display:block;width:100%}
  thead{display:none}
  tbody th{white-space:normal;padding-bottom:4px;border-bottom:none}
  td{padding-top:4px;border-bottom:none}
  tr{border-bottom:1px solid var(--rule);padding-bottom:12px}
}
</style>
