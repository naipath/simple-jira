// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {jirahelper} from '../models';
import {jira} from '../models';
import {context} from '../models';

export function AuthenticateReal(arg1:jirahelper.LoginCredentials):Promise<void>;

export function GetBoards():Promise<Array<jira.Board>>;

export function GetBoardsCached():Promise<Array<jira.Board>>;

export function IsAuthenticated():Promise<boolean>;

export function IssueDetails(arg1:string):Promise<jira.Issue>;

export function IssueDetailsCached(arg1:string):Promise<jira.Issue>;

export function LogOut():Promise<void>;

export function RetrieveBoardDetails(arg1:number):Promise<jira.Board>;

export function RetrieveBoardDetailsCached(arg1:number):Promise<jira.Board>;

export function RetrieveDashboardsForProject(arg1:string):Promise<Array<jira.Board>>;

export function RetrieveDashboardsForProjectCached(arg1:string):Promise<Array<jira.Board>>;

export function RetrieveProject(arg1:string):Promise<jira.Project>;

export function RetrieveProjectCached(arg1:string):Promise<jira.Project>;

export function RetrieveProjects():Promise<jira.ProjectList>;

export function RetrieveProjectsCached():Promise<jira.ProjectList>;

export function RetrieveSprint(arg1:number):Promise<Array<jira.Issue>>;

export function RetrieveSprintCached(arg1:number):Promise<Array<jira.Issue>>;

export function RetrieveSprintsForBoard(arg1:string):Promise<Array<jira.Sprint>>;

export function RetrieveSprintsForBoardCached(arg1:string):Promise<Array<jira.Sprint>>;

export function SearchIssues(arg1:string):Promise<Array<jira.Issue>>;

export function ShutDown():Promise<void>;

export function Startup(arg1:context.Context):Promise<void>;

export function TryLoggingWithPreviousCredentials():Promise<void>;
