// TODO: import du composant Radio fait planter le test
import { TestWindow } from '@stencil/core/dist/testing';
// import { Radio } from '../radio/radio';
import { RadioGroup } from './radio-group';

describe('materials-radio-group', () => {
    it('should build', () => {
        expect(new RadioGroup()).toBeTruthy();
    //    expect(new Radio()).toBeTruthy();
    });

    describe('rendering', () => {
        let element: HTMLMwcRadioGroupElement;
        let window;
        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [RadioGroup],
                html: `
                        <materials-radio-group>
                        <materials-radio label="Lundi" value="Lundi" checked></materials-radio>
                        </materials-radio-group>`
            });
            await window.flush();
        });

        xit('RadioGroup[value] should reflectAttr Radio[checked] Element', async () => {
            expect(element.value).toEqual('Lundi');
        });
    });
});
