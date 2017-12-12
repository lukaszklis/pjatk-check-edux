import {getCourseLink, getCourseName, getUpdatedSections, hasUpdatedEduxColumns} from '../../src/helper/columns-helper';

describe('hasUpdatedEduxColumns', () => {
    it('returns "true" whenever there are any updates', function() {
        const courseElement = '<tr>\n' +
            '\t\t<td>1</td>' +
            '<td><a title="Analysis (AM) - internet based studies" href="req.aspx?id=3222">Analysis (AM) - internet based studies</a></td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>Nowe</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>\n' +
            '\t</tr>';

        expect(hasUpdatedEduxColumns(courseElement)).toBeTruthy();
    });

    it('returns "false" whenever there are no updates', function() {
        const courseElement = '<tr>\n' +
            '\t\t<td>1</td>' +
            '<td><a title="Analysis (AM) - internet based studies" href="req.aspx?id=3222">Analysis (AM) - internet based studies</a></td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>\n' +
            '\t</tr>';

        expect(hasUpdatedEduxColumns(courseElement)).toBeFalsy();
    });
});

describe('getCourseName', () => {
    it('returns the course name', () => {
        const courseElement = '<tr>\n' +
            '\t\t<td>1</td>' +
            '<td><a title="Analysis (AM) - internet based studies" href="req.aspx?id=3222">Analysis (AM) - internet based studies</a></td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>Nowe</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>\n' +
            '\t</tr>';

        expect(getCourseName(courseElement)).toEqual('Analysis (AM) - internet based studies');
    });
});

describe('getCourseLink', () => {
    it('returns the course link', () => {
        const courseElement = '<tr>\n' +
            '\t\t<td>1</td>' +
            '<td><a title="Analysis (AM) - internet based studies" href="req.aspx?id=3222">Analysis (AM) - internet based studies</a></td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>Nowe</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>\n' +
            '\t</tr>';

        expect(getCourseLink(courseElement)).toEqual('req.aspx?id=3222');
    });
});

describe('getUpdatedSections', () => {
    const sections = new Map<number, string>();

    beforeEach(() => {
        [
            'Edycja',
            'Kurs',
            'Bibliografia',
            'FAQ',
            'Foldery zadań',
            'Forum',
            'Kalendarz',
            'Lekcje',
            'Linki',
            'Materiały',
            'Obszar roboczy',
            'Oceny',
            'Ogłoszenia',
            'Quizy',
            'Strony',
            'Testy',
            'Wykłady',
            'Zadania',
        ].forEach((section, index) => sections.set(index, section));
    });

    it('returns an array of updated sections', () => {
        const courseElement = '<tr>\n' +
            '\t\t<td>1</td>' +
            '<td><a title="Analysis (AM) - internet based studies" href="req.aspx?id=3222">Analysis (AM) - internet based studies</a></td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>Nowe</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>Nowe</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>\n' +
            '\t</tr>';

        expect(getUpdatedSections(courseElement, sections)).toEqual([
            'Forum',
            'Oceny',
        ]);
    });

    it('returns an empty array when no sections were updated', () => {
        const courseElement = '<tr>\n' +
            '\t\t<td>1</td>' +
            '<td><a title="Analysis (AM) - internet based studies" href="req.aspx?id=3222">Analysis (AM) - internet based studies</a></td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>' +
            '<td>&nbsp;</td>\n' +
            '\t</tr>';

        expect(getUpdatedSections(courseElement, sections)).toEqual([]);
    });
});
