export namespace jira {
	
	export class ProjectCategory {
	    self: string;
	    id: string;
	    name: string;
	    description: string;
	
	    static createFrom(source: any = {}) {
	        return new ProjectCategory(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	    }
	}
	export class Version {
	    self?: string;
	    id?: string;
	    name?: string;
	    description?: string;
	    archived?: boolean;
	    released?: boolean;
	    releaseDate?: string;
	    userReleaseDate?: string;
	    projectId?: number;
	    startDate?: string;
	
	    static createFrom(source: any = {}) {
	        return new Version(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.archived = source["archived"];
	        this.released = source["released"];
	        this.releaseDate = source["releaseDate"];
	        this.userReleaseDate = source["userReleaseDate"];
	        this.projectId = source["projectId"];
	        this.startDate = source["startDate"];
	    }
	}
	export class IssueType {
	    self?: string;
	    id?: string;
	    description?: string;
	    iconUrl?: string;
	    name?: string;
	    subtask?: boolean;
	    avatarId?: number;
	
	    static createFrom(source: any = {}) {
	        return new IssueType(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.description = source["description"];
	        this.iconUrl = source["iconUrl"];
	        this.name = source["name"];
	        this.subtask = source["subtask"];
	        this.avatarId = source["avatarId"];
	    }
	}
	export class ProjectComponent {
	    self: string;
	    id: string;
	    name: string;
	    description: string;
	    lead?: User;
	    assigneeType: string;
	    assignee: User;
	    realAssigneeType: string;
	    realAssignee: User;
	    isAssigneeTypeValid: boolean;
	    project: string;
	    projectId: number;
	
	    static createFrom(source: any = {}) {
	        return new ProjectComponent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.lead = this.convertValues(source["lead"], User);
	        this.assigneeType = source["assigneeType"];
	        this.assignee = this.convertValues(source["assignee"], User);
	        this.realAssigneeType = source["realAssigneeType"];
	        this.realAssignee = this.convertValues(source["realAssignee"], User);
	        this.isAssigneeTypeValid = source["isAssigneeTypeValid"];
	        this.project = source["project"];
	        this.projectId = source["projectId"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class AvatarUrls {
	    48x48?: string;
	    24x24?: string;
	    16x16?: string;
	    32x32?: string;
	
	    static createFrom(source: any = {}) {
	        return new AvatarUrls(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.48x48 = source["48x48"];
	        this.24x24 = source["24x24"];
	        this.16x16 = source["16x16"];
	        this.32x32 = source["32x32"];
	    }
	}
	export class User {
	    self?: string;
	    accountId?: string;
	    accountType?: string;
	    name?: string;
	    key?: string;
	    emailAddress?: string;
	    avatarUrls?: AvatarUrls;
	    displayName?: string;
	    active?: boolean;
	    timeZone?: string;
	    locale?: string;
	    applicationKeys?: string[];
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.accountId = source["accountId"];
	        this.accountType = source["accountType"];
	        this.name = source["name"];
	        this.key = source["key"];
	        this.emailAddress = source["emailAddress"];
	        this.avatarUrls = this.convertValues(source["avatarUrls"], AvatarUrls);
	        this.displayName = source["displayName"];
	        this.active = source["active"];
	        this.timeZone = source["timeZone"];
	        this.locale = source["locale"];
	        this.applicationKeys = source["applicationKeys"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Project {
	    expand?: string;
	    self?: string;
	    id?: string;
	    key?: string;
	    description?: string;
	    lead?: User;
	    components?: ProjectComponent[];
	    issueTypes?: IssueType[];
	    url?: string;
	    email?: string;
	    assigneeType?: string;
	    versions?: Version[];
	    name?: string;
	    roles?: {[key: string]: string};
	    avatarUrls?: AvatarUrls;
	    projectCategory?: ProjectCategory;
	
	    static createFrom(source: any = {}) {
	        return new Project(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.expand = source["expand"];
	        this.self = source["self"];
	        this.id = source["id"];
	        this.key = source["key"];
	        this.description = source["description"];
	        this.lead = this.convertValues(source["lead"], User);
	        this.components = this.convertValues(source["components"], ProjectComponent);
	        this.issueTypes = this.convertValues(source["issueTypes"], IssueType);
	        this.url = source["url"];
	        this.email = source["email"];
	        this.assigneeType = source["assigneeType"];
	        this.versions = this.convertValues(source["versions"], Version);
	        this.name = source["name"];
	        this.roles = source["roles"];
	        this.avatarUrls = this.convertValues(source["avatarUrls"], AvatarUrls);
	        this.projectCategory = this.convertValues(source["projectCategory"], ProjectCategory);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Priority {
	    self?: string;
	    iconUrl?: string;
	    name?: string;
	    id?: string;
	    statusColor?: string;
	    description?: string;
	
	    static createFrom(source: any = {}) {
	        return new Priority(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.iconUrl = source["iconUrl"];
	        this.name = source["name"];
	        this.id = source["id"];
	        this.statusColor = source["statusColor"];
	        this.description = source["description"];
	    }
	}
	export class StatusCategory {
	    self: string;
	    id: number;
	    name: string;
	    key: string;
	    colorName: string;
	
	    static createFrom(source: any = {}) {
	        return new StatusCategory(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.name = source["name"];
	        this.key = source["key"];
	        this.colorName = source["colorName"];
	    }
	}
	export class Status {
	    self: string;
	    description: string;
	    iconUrl: string;
	    name: string;
	    id: string;
	    statusCategory: StatusCategory;
	
	    static createFrom(source: any = {}) {
	        return new Status(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.description = source["description"];
	        this.iconUrl = source["iconUrl"];
	        this.name = source["name"];
	        this.id = source["id"];
	        this.statusCategory = this.convertValues(source["statusCategory"], StatusCategory);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TimeTracking {
	    originalEstimate?: string;
	    remainingEstimate?: string;
	    timeSpent?: string;
	    originalEstimateSeconds?: number;
	    remainingEstimateSeconds?: number;
	    timeSpentSeconds?: number;
	
	    static createFrom(source: any = {}) {
	        return new TimeTracking(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.originalEstimate = source["originalEstimate"];
	        this.remainingEstimate = source["remainingEstimate"];
	        this.timeSpent = source["timeSpent"];
	        this.originalEstimateSeconds = source["originalEstimateSeconds"];
	        this.remainingEstimateSeconds = source["remainingEstimateSeconds"];
	        this.timeSpentSeconds = source["timeSpentSeconds"];
	    }
	}
	export class Sprint {
	    id: number;
	    name: string;
	    // Go type: time.Time
	    completeDate?: any;
	    // Go type: time.Time
	    endDate?: any;
	    // Go type: time.Time
	    startDate?: any;
	    originBoardId: number;
	    self: string;
	    state: string;
	
	    static createFrom(source: any = {}) {
	        return new Sprint(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.completeDate = this.convertValues(source["completeDate"], null);
	        this.endDate = this.convertValues(source["endDate"], null);
	        this.startDate = this.convertValues(source["startDate"], null);
	        this.originBoardId = source["originBoardId"];
	        this.self = source["self"];
	        this.state = source["state"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ChangelogItems {
	    field: string;
	    fieldtype: string;
	    from: any;
	    fromString: string;
	    to: any;
	    toString: string;
	
	    static createFrom(source: any = {}) {
	        return new ChangelogItems(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.field = source["field"];
	        this.fieldtype = source["fieldtype"];
	        this.from = source["from"];
	        this.fromString = source["fromString"];
	        this.to = source["to"];
	        this.toString = source["toString"];
	    }
	}
	export class ChangelogHistory {
	    id: string;
	    author: User;
	    created: string;
	    items: ChangelogItems[];
	
	    static createFrom(source: any = {}) {
	        return new ChangelogHistory(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.author = this.convertValues(source["author"], User);
	        this.created = source["created"];
	        this.items = this.convertValues(source["items"], ChangelogItems);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Changelog {
	    histories?: ChangelogHistory[];
	
	    static createFrom(source: any = {}) {
	        return new Changelog(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.histories = this.convertValues(source["histories"], ChangelogHistory);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Board {
	    id?: number;
	    self?: string;
	    name?: string;
	    type?: string;
	    filterId?: number;
	
	    static createFrom(source: any = {}) {
	        return new Board(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.self = source["self"];
	        this.name = source["name"];
	        this.type = source["type"];
	        this.filterId = source["filterId"];
	    }
	}
	export class Parent {
	    id?: string;
	    key?: string;
	
	    static createFrom(source: any = {}) {
	        return new Parent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.key = source["key"];
	    }
	}
	export class Epic {
	    id: number;
	    key: string;
	    self: string;
	    name: string;
	    summary: string;
	    done: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Epic(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.key = source["key"];
	        this.self = source["self"];
	        this.name = source["name"];
	        this.summary = source["summary"];
	        this.done = source["done"];
	    }
	}
	export class Attachment {
	    self?: string;
	    id?: string;
	    filename?: string;
	    author?: User;
	    created?: string;
	    size?: number;
	    mimeType?: string;
	    content?: string;
	    thumbnail?: string;
	
	    static createFrom(source: any = {}) {
	        return new Attachment(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.filename = source["filename"];
	        this.author = this.convertValues(source["author"], User);
	        this.created = source["created"];
	        this.size = source["size"];
	        this.mimeType = source["mimeType"];
	        this.content = source["content"];
	        this.thumbnail = source["thumbnail"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Subtasks {
	    id: string;
	    key: string;
	    self: string;
	    fields: IssueFields;
	
	    static createFrom(source: any = {}) {
	        return new Subtasks(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.key = source["key"];
	        this.self = source["self"];
	        this.fields = this.convertValues(source["fields"], IssueFields);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class AffectsVersion {
	    self?: string;
	    id?: string;
	    name?: string;
	    description?: string;
	    archived?: boolean;
	    released?: boolean;
	    releaseDate?: string;
	    userReleaseDate?: string;
	    projectId?: number;
	    startDate?: string;
	
	    static createFrom(source: any = {}) {
	        return new AffectsVersion(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.archived = source["archived"];
	        this.released = source["released"];
	        this.releaseDate = source["releaseDate"];
	        this.userReleaseDate = source["userReleaseDate"];
	        this.projectId = source["projectId"];
	        this.startDate = source["startDate"];
	    }
	}
	export class FixVersion {
	    self?: string;
	    id?: string;
	    name?: string;
	    description?: string;
	    archived?: boolean;
	    released?: boolean;
	    releaseDate?: string;
	    userReleaseDate?: string;
	    projectId?: number;
	    startDate?: string;
	
	    static createFrom(source: any = {}) {
	        return new FixVersion(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.archived = source["archived"];
	        this.released = source["released"];
	        this.releaseDate = source["releaseDate"];
	        this.userReleaseDate = source["userReleaseDate"];
	        this.projectId = source["projectId"];
	        this.startDate = source["startDate"];
	    }
	}
	export class TransitionField {
	    required: boolean;
	
	    static createFrom(source: any = {}) {
	        return new TransitionField(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.required = source["required"];
	    }
	}
	export class Transition {
	    id: string;
	    name: string;
	    to: Status;
	    fields: {[key: string]: TransitionField};
	
	    static createFrom(source: any = {}) {
	        return new Transition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.to = this.convertValues(source["to"], Status);
	        this.fields = this.convertValues(source["fields"], TransitionField, true);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class CommentVisibility {
	    type?: string;
	    value?: string;
	
	    static createFrom(source: any = {}) {
	        return new CommentVisibility(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.value = source["value"];
	    }
	}
	export class Comment {
	    id?: string;
	    self?: string;
	    name?: string;
	    author?: User;
	    body?: string;
	    updateAuthor?: User;
	    updated?: string;
	    created?: string;
	    // Go type: CommentVisibility
	    visibility?: any;
	
	    static createFrom(source: any = {}) {
	        return new Comment(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.self = source["self"];
	        this.name = source["name"];
	        this.author = this.convertValues(source["author"], User);
	        this.body = source["body"];
	        this.updateAuthor = this.convertValues(source["updateAuthor"], User);
	        this.updated = source["updated"];
	        this.created = source["created"];
	        this.visibility = this.convertValues(source["visibility"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Comments {
	    comments?: Comment[];
	
	    static createFrom(source: any = {}) {
	        return new Comments(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.comments = this.convertValues(source["comments"], Comment);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class IssueRenderedFields {
	    resolutiondate?: string;
	    created?: string;
	    duedate?: string;
	    updated?: string;
	    comment?: Comments;
	    description?: string;
	
	    static createFrom(source: any = {}) {
	        return new IssueRenderedFields(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.resolutiondate = source["resolutiondate"];
	        this.created = source["created"];
	        this.duedate = source["duedate"];
	        this.updated = source["updated"];
	        this.comment = this.convertValues(source["comment"], Comments);
	        this.description = source["description"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Issue {
	    expand?: string;
	    id?: string;
	    self?: string;
	    key?: string;
	    fields?: IssueFields;
	    renderedFields?: IssueRenderedFields;
	    changelog?: Changelog;
	    transitions?: Transition[];
	    names?: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new Issue(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.expand = source["expand"];
	        this.id = source["id"];
	        this.self = source["self"];
	        this.key = source["key"];
	        this.fields = this.convertValues(source["fields"], IssueFields);
	        this.renderedFields = this.convertValues(source["renderedFields"], IssueRenderedFields);
	        this.changelog = this.convertValues(source["changelog"], Changelog);
	        this.transitions = this.convertValues(source["transitions"], Transition);
	        this.names = source["names"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class IssueLinkType {
	    id?: string;
	    self?: string;
	    name: string;
	    inward: string;
	    outward: string;
	
	    static createFrom(source: any = {}) {
	        return new IssueLinkType(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.self = source["self"];
	        this.name = source["name"];
	        this.inward = source["inward"];
	        this.outward = source["outward"];
	    }
	}
	export class IssueLink {
	    id?: string;
	    self?: string;
	    // Go type: IssueLinkType
	    type: any;
	    outwardIssue?: Issue;
	    inwardIssue?: Issue;
	    // Go type: Comment
	    comment?: any;
	
	    static createFrom(source: any = {}) {
	        return new IssueLink(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.self = source["self"];
	        this.type = this.convertValues(source["type"], null);
	        this.outwardIssue = this.convertValues(source["outwardIssue"], Issue);
	        this.inwardIssue = this.convertValues(source["inwardIssue"], Issue);
	        this.comment = this.convertValues(source["comment"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class EntityProperty {
	    key: string;
	    value: any;
	
	    static createFrom(source: any = {}) {
	        return new EntityProperty(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.key = source["key"];
	        this.value = source["value"];
	    }
	}
	export class WorklogRecord {
	    self?: string;
	    author?: User;
	    updateAuthor?: User;
	    comment?: string;
	    // Go type: Time
	    created?: any;
	    // Go type: Time
	    updated?: any;
	    // Go type: Time
	    started?: any;
	    timeSpent?: string;
	    timeSpentSeconds?: number;
	    id?: string;
	    issueId?: string;
	    properties?: EntityProperty[];
	
	    static createFrom(source: any = {}) {
	        return new WorklogRecord(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.author = this.convertValues(source["author"], User);
	        this.updateAuthor = this.convertValues(source["updateAuthor"], User);
	        this.comment = source["comment"];
	        this.created = this.convertValues(source["created"], null);
	        this.updated = this.convertValues(source["updated"], null);
	        this.started = this.convertValues(source["started"], null);
	        this.timeSpent = source["timeSpent"];
	        this.timeSpentSeconds = source["timeSpentSeconds"];
	        this.id = source["id"];
	        this.issueId = source["issueId"];
	        this.properties = this.convertValues(source["properties"], EntityProperty);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Worklog {
	    startAt: number;
	    maxResults: number;
	    total: number;
	    worklogs: WorklogRecord[];
	
	    static createFrom(source: any = {}) {
	        return new Worklog(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.startAt = source["startAt"];
	        this.maxResults = source["maxResults"];
	        this.total = source["total"];
	        this.worklogs = this.convertValues(source["worklogs"], WorklogRecord);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Progress {
	    progress: number;
	    total: number;
	    percent: number;
	
	    static createFrom(source: any = {}) {
	        return new Progress(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.progress = source["progress"];
	        this.total = source["total"];
	        this.percent = source["percent"];
	    }
	}
	export class Component {
	    self?: string;
	    id?: string;
	    name?: string;
	    description?: string;
	
	    static createFrom(source: any = {}) {
	        return new Component(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	    }
	}
	export class Watcher {
	    self?: string;
	    name?: string;
	    accountId?: string;
	    displayName?: string;
	    active?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Watcher(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.name = source["name"];
	        this.accountId = source["accountId"];
	        this.displayName = source["displayName"];
	        this.active = source["active"];
	    }
	}
	export class Watches {
	    self?: string;
	    watchCount?: number;
	    isWatching?: boolean;
	    watchers?: Watcher[];
	
	    static createFrom(source: any = {}) {
	        return new Watches(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.watchCount = source["watchCount"];
	        this.isWatching = source["isWatching"];
	        this.watchers = this.convertValues(source["watchers"], Watcher);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Resolution {
	    self: string;
	    id: string;
	    description: string;
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new Resolution(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.self = source["self"];
	        this.id = source["id"];
	        this.description = source["description"];
	        this.name = source["name"];
	    }
	}
	export class IssueFields {
	    expand?: string;
	    issuetype?: IssueType;
	    project?: Project;
	    environment?: string;
	    resolution?: Resolution;
	    priority?: Priority;
	    // Go type: Time
	    resolutiondate?: any;
	    // Go type: Time
	    created?: any;
	    // Go type: Date
	    duedate?: any;
	    watches?: Watches;
	    assignee?: User;
	    // Go type: Time
	    updated?: any;
	    description?: string;
	    summary?: string;
	    Creator?: User;
	    reporter?: User;
	    components?: Component[];
	    status?: Status;
	    progress?: Progress;
	    aggregateprogress?: Progress;
	    timetracking?: TimeTracking;
	    timespent?: number;
	    timeestimate?: number;
	    timeoriginalestimate?: number;
	    worklog?: Worklog;
	    issuelinks?: IssueLink[];
	    comment?: Comments;
	    fixVersions?: FixVersion[];
	    versions?: AffectsVersion[];
	    labels?: string[];
	    subtasks?: Subtasks[];
	    attachment?: Attachment[];
	    epic?: Epic;
	    sprint?: Sprint;
	    parent?: Parent;
	    aggregatetimeoriginalestimate?: number;
	    aggregatetimespent?: number;
	    aggregatetimeestimate?: number;
	
	    static createFrom(source: any = {}) {
	        return new IssueFields(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.expand = source["expand"];
	        this.issuetype = this.convertValues(source["issuetype"], IssueType);
	        this.project = this.convertValues(source["project"], Project);
	        this.environment = source["environment"];
	        this.resolution = this.convertValues(source["resolution"], Resolution);
	        this.priority = this.convertValues(source["priority"], Priority);
	        this.resolutiondate = this.convertValues(source["resolutiondate"], null);
	        this.created = this.convertValues(source["created"], null);
	        this.duedate = this.convertValues(source["duedate"], null);
	        this.watches = this.convertValues(source["watches"], Watches);
	        this.assignee = this.convertValues(source["assignee"], User);
	        this.updated = this.convertValues(source["updated"], null);
	        this.description = source["description"];
	        this.summary = source["summary"];
	        this.Creator = this.convertValues(source["Creator"], User);
	        this.reporter = this.convertValues(source["reporter"], User);
	        this.components = this.convertValues(source["components"], Component);
	        this.status = this.convertValues(source["status"], Status);
	        this.progress = this.convertValues(source["progress"], Progress);
	        this.aggregateprogress = this.convertValues(source["aggregateprogress"], Progress);
	        this.timetracking = this.convertValues(source["timetracking"], TimeTracking);
	        this.timespent = source["timespent"];
	        this.timeestimate = source["timeestimate"];
	        this.timeoriginalestimate = source["timeoriginalestimate"];
	        this.worklog = this.convertValues(source["worklog"], Worklog);
	        this.issuelinks = this.convertValues(source["issuelinks"], IssueLink);
	        this.comment = this.convertValues(source["comment"], Comments);
	        this.fixVersions = this.convertValues(source["fixVersions"], FixVersion);
	        this.versions = this.convertValues(source["versions"], AffectsVersion);
	        this.labels = source["labels"];
	        this.subtasks = this.convertValues(source["subtasks"], Subtasks);
	        this.attachment = this.convertValues(source["attachment"], Attachment);
	        this.epic = this.convertValues(source["epic"], Epic);
	        this.sprint = this.convertValues(source["sprint"], Sprint);
	        this.parent = this.convertValues(source["parent"], Parent);
	        this.aggregatetimeoriginalestimate = source["aggregatetimeoriginalestimate"];
	        this.aggregatetimespent = source["aggregatetimespent"];
	        this.aggregatetimeestimate = source["aggregatetimeestimate"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	

}

export namespace jirahelper {
	
	export class LoginCredentials {
	    url: string;
	    emailAddress: string;
	    token: string;
	
	    static createFrom(source: any = {}) {
	        return new LoginCredentials(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.emailAddress = source["emailAddress"];
	        this.token = source["token"];
	    }
	}
	export class SearchResult {
	    issues: Issue[];
	    startAt: number;
	    maxResults: number;
	    total: number;
	
	    static createFrom(source: any = {}) {
	        return new SearchResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.issues = this.convertValues(source["issues"], Issue);
	        this.startAt = source["startAt"];
	        this.maxResults = source["maxResults"];
	        this.total = source["total"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

