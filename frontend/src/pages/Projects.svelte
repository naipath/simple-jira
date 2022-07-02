<script>
    import {onMount} from "svelte";
    import {callTracker, groupArr} from "./../util.js";
    import {RetrieveProjects, RetrieveProjectsCached} from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import Page from "../components/Page.svelte";

    let projects = []
    onMount(async () => retrieveProjects())

    const retrieveProjects = async () => {
        projects = (await RetrieveProjectsCached()) || []
        projects = await callTracker("RetrieveProjects", async () => await RetrieveProjects())
    }

</script>

<Page title="Projects" refresh={retrieveProjects}>
    <section class="mbs24">
        {#each groupArr(projects.sort((a, b) => a.name.localeCompare(b.name)), 2) as projectsWindow}
            <div class="flex">
                <div class="column"><a href="/app/projects/{projectsWindow[0].key}">{projectsWindow[0].name}</a>
                </div>
                {#if projectsWindow.length > 1}
                    <div class="column"><a
                            href="/app/projects/{projectsWindow[1].key}">{projectsWindow[1].name}</a>
                    </div>
                {/if}
            </div>
        {/each}
    </section>
</Page>
<style>
    .column {
        flex: 1;
    }
</style>