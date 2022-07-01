<script>
    import {Button, Close} from "agnostic-svelte";
    import {AddFavourite} from "../../wailsjs/go/main/App.js";

    export let url = ""
    export let name = ""

    let saved = false
    const saveFavourite = async () => {
        await AddFavourite(url, name)
        saved = true
        setTimeout(() => saved = false, 3000)
    }
    const close = () => saved = false
</script>
<div>
    <Button style="background: gold;" on:click={saveFavourite}>Favourite</Button>
    {#if saved}
        <div class="custom-alert-container">
            <div class="custom-alert">
                <p>Saved</p>
                <Close color="var(--agnostic-action-dark)" on:click={close}/>
            </div>
        </div>
    {/if}
</div>
<style>
    .custom-alert-container {
        position: absolute;
        top: 80px;
        right: 20px;
        z-index: 1000;
        width: 150px;
    }

    .custom-alert {
        display: flex;
        justify-content: space-between;
        background: var(--agnostic-action-light);
        color: var(--agnostic-action-dark);
        padding: var(--agnostic-side-padding);
    }
</style>