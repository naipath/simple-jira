<script>
    import {Button, Card, Input, Tag} from "agnostic-svelte";
    import {SearchIssues} from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import {callTracker} from "./../util.js";
    import Page from "../components/Page.svelte";

    let searchQuery = "project = BOND AND issuetype = Story"
    let issues = []

    const handleSearch = async (e) => {
        e.preventDefault()
        issues = await callTracker("SearchIssues", async () => await SearchIssues(searchQuery))
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
<Page>
    <form on:submit={handleSearch} class="mbe24 form">
        <Input type="text" placeholder="Query" label="Query jira issues" bind:value={searchQuery}/>
        <Button type="submit" mode="primary">Search</Button>
    </form>
    <section>
        {#each issues as issue}
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
<style>
    .form {
        display: flex;
        align-items: end;
    }

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