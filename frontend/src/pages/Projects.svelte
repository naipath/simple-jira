<script>
    import {onMount} from "svelte";
    import {Input} from "agnostic-svelte";
    import {callTracker, groupArr} from "./../util.js";
    import {RetrieveProjects, RetrieveProjectsCached} from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import Page from "../components/Page.svelte";

    let projects = []
    let searchQuery = ""
    onMount(async () => retrieveProjects())

    const retrieveProjects = async () => {
        projects = (await RetrieveProjectsCached()) || []
        projects = await callTracker("RetrieveProjects", async () => await RetrieveProjects())
    }
</script>

<Page title="Projects" refresh={retrieveProjects}>
    <Input type="text" placeholder="Search" bind:value={searchQuery}/>
    <section class="mbs16">
        {#each groupArr(projects
            .filter(p => p.name.toUpperCase().includes(searchQuery.toUpperCase()) || p.key.toUpperCase().includes(searchQuery.toUpperCase()))
            .sort((a, b) => a.name.localeCompare(b.name)), 2) as projectsWindow}
            <div class="flex">
                <div class="column mbe4 mbs4">
                    <img src="{projectsWindow[0].avatarUrls['48x48']}" height="24" width="24"
                         alt="avatar {projectsWindow[0].key}"/>
                    <a href="/app/projects/{projectsWindow[0].key}">{projectsWindow[0].name}</a>
                </div>
                {#if projectsWindow.length > 1}
                    <div class="column mbe4 mbs4">
                        <img src="{projectsWindow[1].avatarUrls['48x48']}" height="24" width="24"
                             alt="avatar {projectsWindow[1].key}"/>
                        <a href="/app/projects/{projectsWindow[1].key}">{projectsWindow[1].name}</a>
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