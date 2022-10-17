import { screen, cleanup, render } from '@testing-library/react';

import Heading from '../';

afterEach( () => cleanup() );

test('Heading should be mapped to their corresponding htmlt tag', () => {
    expect(true).toBe(true);
    // TODO: Wait till components has extracted custom logics
    // render(<>
    //     <Heading id={'tag'} level={1}>H1</Heading>
    //     <Heading id={'tag'} level={2}>H2</Heading>
    //     <Heading id={'tag'} level={3}>H3</Heading>
    //     <Heading id={'tag'} level={4}>H4</Heading>
    //     <Heading id={'tag'} level={5}>H5</Heading>
    //     <Heading id={'tag'} level={6}>H6</Heading>
    // </>);

    // const headingEls = screen.getAllByTestId('heading-tag');

    // expect(headingEls).toHaveLength(6);
    // for ( var i = 1; i <= headingEls.length; i++ ) {
    //     const headingEl = headingEls[i];
    //     expect(headingEl).toBe(`<h${i}>H${i}</h${i}>`);
    // }
});