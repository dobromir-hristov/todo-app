import RecycledTodoItem from '@/components/RecycledTodoItem'
import { notDeletedItem } from '../data/ToDoFactory'
import { mount } from '@vue/test-utils'

/**
 * @param overrides
 * @return {{wrapper: Wrapper<Vue>, config: any}}
 */
const createWrapper = (overrides) => {
  let config = Object.assign(
    {
      propsData: {
        item: notDeletedItem()
      }
    },
    overrides
  )

  const wrapper = mount(RecycledTodoItem, config)

  return {
    config,
    wrapper
  }
}

describe('RecycledTodoItem', () => {
  it('renders the RecycledTodoItem', async () => {
    const { wrapper } = createWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('Fires a restore event', async () => {
    const { wrapper } = createWrapper()
    wrapper.find(testid('restoreTrigger')).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('restore')).toBeTruthy()
  })

  it('fires a remove event', async () => {
    const { wrapper } = createWrapper()
    wrapper.find(testid('removeTrigger')).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('remove')).toBeTruthy()
  })
})
