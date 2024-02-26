import { mount } from '@vue/test-utils';
import CustomerCreate from '../Create.vue';

describe('CustomerCreate', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(CustomerCreate);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('renders input for name', () => {
        const wrapper = mount(CustomerCreate);
        expect(wrapper.find('input[name="name"]').exists()).toBe(true);
    });

    test('validate form input - name field required', async () => {
        const wrapper = mount(CustomerCreate);
        await wrapper.setData({ name: '' });
        await wrapper.find('form').trigger('submit.prevent');
        expect(wrapper.text()).toContain('氏名は必須です');
    });
});
