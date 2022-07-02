<script>
    import {GetBoards, GetBoardsCached} from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import {callTracker, groupArr} from "./../util.js";
    import {onMount} from "svelte";
    import Page from "../components/Page.svelte";
    import LoadingScreen from "./../components/LoadingScreen.svelte";

    let boards = []

    const retrieveBoards = async () => {
        boards = (await GetBoardsCached()) || []
        boards = await callTracker("GetBoards", async () => await GetBoards())
    }

    onMount(() => retrieveBoards())
</script>

{#if boards.length === 0}
    <LoadingScreen/>
{/if}

{#if boards.length > 0}
    <Page title="Boards" refresh={retrieveBoards}>
        <section class="mbs16">
            {#each groupArr(boards.sort((a, b) => a.name.localeCompare(b.name)), 2) as boardsWindow}
                <div class="flex">
                    <div class="column"><a href="/app/boards/{boardsWindow[0].id}">{boardsWindow[0].name}</a></div>
                    {#if boardsWindow.length > 1}
                        <div class="column"><a href="/app/boards/{boardsWindow[1].id}">{boardsWindow[1].name}</a></div>
                    {/if}
                </div>
            {/each}
        </section>
    </Page>
{/if}
<style>
    .column {
        flex: 1
    }
</style>