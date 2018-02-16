export class Course {
    public name: string;
    public link: string;
    public updates: string[];

    constructor(name: string, link: string, updates: string[]) {
        this.name = name;
        this.link = link;
        this.updates = updates;
    }
}
