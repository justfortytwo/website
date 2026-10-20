<script setup lang="ts">
import { boundary } from '~/data/boundary'

const props = defineProps<{ agentLabel?: string; agentOwns?: string[]; fortytwoLabel?: string; fortytwoAdds?: string[] }>()
const c = computed(() => ({
  agentLabel: props.agentLabel ?? boundary.agentLabel,
  agentOwns: props.agentOwns ?? boundary.agentOwns,
  fortytwoLabel: props.fortytwoLabel ?? boundary.fortytwoLabel,
  fortytwoAdds: props.fortytwoAdds ?? boundary.fortytwoAdds,
}))
</script>
<template>
  <div class="contrast">
    <div class="col agent">
      <h3 class="lab">{{ c.agentLabel }}</h3>
      <ul>
        <li v-for="a in c.agentOwns" :key="a">{{ a }}</li>
      </ul>
    </div>
    <div class="col ours">
      <h3 class="lab">{{ c.fortytwoLabel }}</h3>
      <ul>
        <li v-for="a in c.fortytwoAdds" :key="a">{{ a }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.contrast{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--rule)}
.col{padding:30px 30px 34px}
.col.ours{border-left:1px solid var(--rule);background:var(--paper-2)}
.lab{font-family:var(--font-mono);font-weight:400;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:var(--mute);margin-bottom:18px}
.ours .lab{color:var(--bronze-3)}
ul{list-style:none}
li{font-family:var(--font-serif);font-size:21px;line-height:1.3;letter-spacing:-.2px;padding:9px 0;border-bottom:1px solid var(--rule);color:var(--ink-2)}
li:last-child{border-bottom:none}
.ours li{color:var(--ink)}
@media (max-width:860px){
  .contrast{grid-template-columns:1fr}
  .col.ours{border-left:none;border-top:1px solid var(--rule)}
}
</style>
