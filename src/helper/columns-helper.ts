function isColumnUpdated(column: string): boolean {
    return column.includes('New');
}

function getEduxColumns(courseElement: string): string[] {
    return courseElement
        .split('</td>')
        .map((line) => line.replace(/<td>/g, ''))
        .filter(Boolean);
}

export function hasUpdatedEduxColumns(courseElement: string): boolean {
    return getEduxColumns(courseElement).some((column) => isColumnUpdated(column));
}

export function getCourseName(courseElement: string): string {
    return getEduxColumns(courseElement)[1]
        .replace(/<a[^>]*>|<\/a>/g, '')
        .trim();
}

export function getCourseLink(courseElement: string): string {
    return getEduxColumns(courseElement)[1].match(/req\.aspx\?id=\d+/g)[0];
}

export function getUpdatedSections(courseElement: string, sections: Map<number, string>): string[] {
    return [
        ...getEduxColumns(courseElement)
            .map((column, index) => isColumnUpdated(column) && sections.get(index))
            .filter(Boolean),
    ];
}
