<script>
  import { user } from "../stores"
  export let title = '';
  export let subTitle = '';
</script>

<div class="box has-text-centered columns m-2">
  <div class="column">
    <i style="font-size: 48px; color: Dodgerblue;" class="fas fa-icons"></i>
  </div>
  <div class="column">
    <div class="title is-4">{title}</div>
    <div class="subtitle is-5">{subTitle}</div>
  </div>
  <div class="column">
    <i class="fas fa-camera fa-3x" style="color:rgb(95, 96, 173)" />
    <div class="is-size-7">
      {#if $user?.email}
        {$user?.email}
      {:else}
        ShutterSpotter
      {/if}
    </div>
  </div>
</div>