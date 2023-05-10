<script lang="ts">
  import { goto } from "$app/navigation";
  import { shutterSpotterService } from "../../services/shutter-spotter-service";

  shutterSpotterService.logout();
  goto("/");
</script>
