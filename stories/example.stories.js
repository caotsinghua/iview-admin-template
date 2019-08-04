/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MyButton from './MyButton';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => ({
    components: { Welcome },
    template: '<welcome :showApp="action" />',
    methods: { action: linkTo('Button') }
}));

storiesOf('Button', module)
    .add('with text', () => ({
        components: { MyButton },
        template: '<my-button @click="action">Hello Button</my-button>',
        methods: {
            action: () => {
                action('clicked')('asd');
            }
        }
    }))
    .add('with JSX', () => ({
        components: { MyButton },
        render(h) {
            return <my-button onClick={this.action}>With JSX2</my-button>;
        },
        methods: { action: linkTo('Welcome') }
    }))
    .add('with some emoji', () => ({
        components: { MyButton },
        template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
        methods: { action: action('clicked') }
    }));
