<script>
    import {Spinner} from "agnostic-svelte";
    export let text = "Loading"
</script>

<main class="loading-screen">
    <div>
        <h3 class="mbe18">{text}</h3>
        <Spinner size="xlarge"/>
    </div>
</main>


<style>
    .loading-screen {
        position: fixed;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }

    .loading-screen > div {
        margin-top: -100px;
    }
</style>