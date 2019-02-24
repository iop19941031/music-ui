import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'

describe('App.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const wrapper = shallowMount(App, {
    stubs: ['router-link', 'router-view']
  })
  it('存在类名为top的元素', () => {
    expect(wrapper.find('.top').exists()).toBe(true)
  })

  it('类名为top的元素的display属性', () => {
    expect(wrapper.find('.top').attributes('style')).toBe('display: none;')
  })
  it('top为false', () => {
    expect(wrapper.vm.topShow).toBe(false)
  })
  it('启动类名为top的元素的点击事件', () => {
    wrapper.find('.top').trigger('click')
    expect(wrapper.vm.topShow).toBe(false)
    // expect().toBe(0)
  })
})
