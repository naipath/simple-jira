<script>
    import {Header, HeaderNav, HeaderNavItem} from 'agnostic-svelte';
    import {onMount} from 'svelte';
    import {active, Route, router} from 'tinro';
    import {IsAuthenticated, LogOut, TryLoggingWithPreviousCredentials} from '../wailsjs/go/jirahelper/JiraHelper.js'
    import Boards from "./pages/Boards.svelte";
    import {LogPrint} from "../wailsjs/runtime/runtime.js";
    import Login from "./pages/Login.svelte";
    import LoadingScreen from "./components/LoadingScreen.svelte";
    import SearchIssues from "./pages/SearchIssues.svelte";
    import IssueDetails from "./pages/IssueDetails.svelte";
    import Home from "./pages/Home.svelte";
    import Projects from "./pages/Projects.svelte";
    import ProjectDetails from "./pages/ProjectDetails.svelte";
    import BoardDetails from "./pages/BoardDetails.svelte";
    import SprintDetails from "./pages/SprintDetails.svelte";

    router.mode.memory()

    onMount(async () => {
        await TryLoggingWithPreviousCredentials()
        if (await IsAuthenticated()) {
            router.goto("/app")
            LogPrint("Authenticated with Jira")
        } else {
            router.goto("/login")
            LogPrint("Unauthenticated with Jira")
        }
    })

    const logout = async () => {
        await LogOut()
        router.goto("/login")
    }

    let toasts = []
    document.addEventListener("timing-backend-call", e => {
        toasts = [...toasts, e.detail,]
        setTimeout(() => {
            toasts = [...toasts.slice(1)]
        }, 3000)
    });
</script>

<body>

<Route path="/">
    <LoadingScreen/>
</Route>

<Route path="/login">
    <Login/>
</Route>

<Route path="/app/*">
    <Header isSticky>
        <HeaderNav>
            <HeaderNavItem><a href="/app/home" use:active>Home</a></HeaderNavItem>
            <HeaderNavItem><a href="/app/projects" use:active>Projects</a></HeaderNavItem>
            <HeaderNavItem><a href="/app/boards" use:active>Boards</a></HeaderNavItem>
            <HeaderNavItem><a href="/app/search-issues" use:active>Search issues</a></HeaderNavItem>
        </HeaderNav>
        <div slot="logoright">
            <HeaderNavItem><a href="/logout" on:click={logout}>Logout</a></HeaderNavItem>
        </div>
    </Header>
    <Route path="/" redirect="/app/home"/>
    <Route path="/home">
        <Home/>
    </Route>
    <Route path="/boards/*">
        <Route path="/">
            <Boards/>
        </Route>
        <Route path="/:boardId" let:meta>
            <BoardDetails boardId={meta.params.boardId}/>
        </Route>
    </Route>
    <Route path="/search-issues">
        <SearchIssues/>
    </Route>
    <Route path="/projects/*">
        <Route path="/">
            <Projects/>
        </Route>
        <Route path="/:projectKey" let:meta>
            <ProjectDetails projectKey={meta.params.projectKey}/>
        </Route>
    </Route>
    <Route path="/issues/:issueKey" let:meta>
        <IssueDetails issueKey={meta.params.issueKey}/>
    </Route>
    <Route path="/sprints/:sprintId" let:meta>
        <SprintDetails sprintId={meta.params.sprintId}/>
    </Route>
    <div class="call-tracking">
        {#each toasts as toast}
            <p class="mbe8">{toast}</p>
        {/each}
    </div>
</Route>
</body>
<style>
    .call-tracking {
        font-size: 14px;
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 1000
    }
</style>
