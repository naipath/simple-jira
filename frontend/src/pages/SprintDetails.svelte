<script>
    import {meta, router} from "tinro"
    import {onMount} from "svelte";
    import {callTracker} from "./../util.js";
    import {Card, Tag} from "agnostic-svelte";
    import LoadingScreen from "./../components/LoadingScreen.svelte";
    import {RetrieveSprint, RetrieveSprintCached} from "../../wailsjs/go/main/App.js";
    import Page from "../components/Page.svelte";

    export let sprintId
    let sprint = null
    const route = meta();

    onMount(async () => retrieveSprint())

    const retrieveSprint = async () => {
        sprint = (await RetrieveSprintCached(Number(sprintId))) || []
        callTracker("RetrieveSprint", async () => await RetrieveSprint(Number(sprintId))).then(p => {
            if (p) sprint = p;
        })
    }
    const resolveType = (status) => {
        switch (status.toLowerCase()) {
            case "done":
                return "success"
            case "under development":
            case "in progress":
                return "warning"
        }
        return ""
    }
</script>


{#if sprintId == null}
    <LoadingScreen text="Loading {sprintId}"/>
{/if}
{#if sprint}
    <Page title="Sprint" previousUrl={route.from} favouriteName={"Sprint - " + sprintId} favouriteUrl={route.url} refresh={retrieveSprint}>
        <section class="mbs24">
            {#each sprint.filter(s => s.fields.issuetype.id !== "10003") as issue}
                <a class="card-wrapper" href="/app/issues/{issue.key}">
                    <Card isBorder>
                        <div class="p16">{issue.key}</div>
                        <div class="p16 flex-grow-1 flex-shrink-1" style="flex-basis: 50ch;">
                            {issue.fields.summary}
                        </div>
                        <div class="tag-position">
                            <Tag type={resolveType(issue.fields.status.name)} isUppercase="true">
                                {issue.fields.status.name}
                            </Tag>
                        </div>
                    </Card>
                </a>
                <div class="mbe8"></div>
            {/each}
        </section>
    </Page>
{/if}
<style>
    .tag-position {
        position: absolute;
        top: -2px;
        right: 0
    }

    .card-wrapper {
        display: block;
        transition: all 0.1s ease-in-out;
        cursor: pointer;
        text-decoration: none;
        color: black;

    }

    @media (prefers-color-scheme: dark) {
        .card-wrapper {
            color: white
        }
    }

    .card-wrapper:hover {
        transform: scale(1.02);

    }
</style>