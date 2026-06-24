<template>
  <div class="monument" aria-hidden="true">
    <div class="grid-bg"></div>
    <div class="frame"></div>
    <div class="cross-v"></div><div class="cross-h"></div>
    <div class="ans42">
      <span class="extr e5">42</span><span class="extr e4">42</span>
      <span class="extr e3">42</span><span class="extr e2">42</span>
      <span class="extr e1">42</span>
      <span class="face">42</span>
    </div>
    <div class="annot a-top">ANSWER · ABSOLUTE</div>
    <div class="annot a-right">FIG. 042</div>
    <div class="annot a-bl">COMPUTED · 7.5M YR</div>
    <div class="annot a-br">★ CERTAINTY 1.0</div>
    <div class="tick top">042</div>
    <div class="tick bot">▾</div>
  </div>
</template>
<style scoped>
.monument{position:relative;aspect-ratio:1/.92;display:flex;align-items:center;justify-content:center}
.grid-bg{position:absolute;inset:6% 4%;
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:30px 30px;opacity:.34}
.frame{position:absolute;inset:6% 4%;border:1px solid #b9c2cd}
.cross-v{position:absolute;left:50%;top:6%;bottom:6%;width:1px;background:#b9c2cd}
.cross-h{position:absolute;top:50%;left:4%;right:4%;height:1px;background:#b9c2cd}
.ans42{position:relative;font-family:var(--font-serif);font-weight:600;
  font-size:clamp(140px,26vw,300px);line-height:1;letter-spacing:-12px;z-index:3}
.ans42 .face{position:relative;
  background:linear-gradient(158deg,#F0D076 0%,var(--bronze-1) 22%,var(--bronze-2) 52%,var(--bronze-3) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.extr{position:absolute;top:0;left:0;z-index:1}
.extr.e1{transform:translate(2px,2px);color:#6e5213}
.extr.e2{transform:translate(4px,4px);color:#5a4310}
.extr.e3{transform:translate(6px,6px);color:#47340c}
.extr.e4{transform:translate(8px,8px);color:#352708}
.extr.e5{transform:translate(10px,10px);color:#241a05}
.annot{position:absolute;font-family:var(--font-mono);font-size:10px;letter-spacing:1.4px;
  color:var(--ink-2);z-index:4}
.annot::before{content:"";display:inline-block;width:14px;height:1px;background:var(--ink-2);
  vertical-align:middle;margin-right:6px}
.a-top{top:8%;left:6%}.a-right{top:30%;right:2%}.a-bl{bottom:9%;left:4%}
.a-br{bottom:7%;right:6%;color:var(--bronze-3)}
.a-br::before{background:var(--bronze-3)}
.tick{position:absolute;font-family:var(--font-mono);font-size:9px;color:var(--mute);z-index:4}
.tick.top{top:6%;left:50%;transform:translateX(-50%)}
.tick.bot{bottom:4%;left:50%;transform:translateX(-50%)}
</style>
