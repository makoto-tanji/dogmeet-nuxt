import { mount } from '@vue/test-utils'
import Home from '@/pages/index'
import axios from 'axios';

describe('index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Home)
    jest.mock('axios');
  })

  test('is exist', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})