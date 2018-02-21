import { Course } from '../../src/model/course';

describe('Course', () => {
    it('creates a new instance properly', () => {
        expect(new Course('foo', 'bar.aspx', [])).toBeTruthy();
    });
});
