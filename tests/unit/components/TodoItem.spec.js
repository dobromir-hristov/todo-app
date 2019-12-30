import TodoItem from '@/components/TodoItem'
import { completedItem, notDeletedItem } from '../data/ToDoFactory'
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

  const wrapper = mount(TodoItem, config)

  return {
    config,
    wrapper
  }
}

describe('TodoItem', () => {
  it('renders the TodoItem', () => {
    const { wrapper } = createWrapper()
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a functioning checkbox', () => {
    const { wrapper } = createWrapper()
    let checkbox = wrapper.find(testid('completeCheckbox'))
    expect(checkbox.exists()).toBeTruthy()
    expect(checkbox.element.checked).toBe(false)
    wrapper.setProps({
      item: completedItem()
    })
    checkbox = wrapper.find(testid('completeCheckbox'))
    expect(checkbox.element.checked).toBe(true)
  })

  it('renders the content if not editing', async () => {
    const { wrapper } = createWrapper()
    wrapper.find(testid('completeCheckbox')).setChecked()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('change')[0][0]).toMatchObject({
      completedAt: expect.any(Number)
    })
  })

  it('allows editing the input on content double click', async () => {
    const { wrapper } = createWrapper()
    expect(wrapper.find(testid('editInput')).exists()).toBe(false)

    wrapper.find(testid('contentEditTrigger')).trigger('dblclick')

    await wrapper.vm.$nextTick()
    expect(wrapper.find(testid('editInput')).exists()).toBe(true)
  })

  it('sets the todo item content as a value of the input', () => {
    const { wrapper } = createWrapper()
    wrapper.find(testid('contentEditTrigger')).trigger('dblclick')

    expect(wrapper.find(testid('editInput')).element.value).toBe('notDeleted')
  })

  it('does not emit an event if no content in the edit', async () => {
    const { wrapper } = createWrapper()
    wrapper.find(testid('contentEditTrigger')).trigger('dblclick')
    await wrapper.vm.$nextTick()
    wrapper.find(testid('editInput')).setValue('')
    wrapper.find(testid('editInput')).trigger('keyup.enter')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('reverts back when editing is finished', async () => {
    const { wrapper } = createWrapper()
    wrapper.find(testid('contentEditTrigger')).trigger('dblclick')
    await wrapper.vm.$nextTick()
    wrapper.find(testid('editInput')).setValue('New content')
    wrapper.find(testid('editInput')).trigger('keyup.enter')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('change')[0][0]).toMatchObject({
      content: 'New content'
    })
    expect(wrapper.find(testid('editInput')).exists()).toBe(false)
  })

  it('sets the item as deleted on deleted click', async () => {
    const { wrapper } = createWrapper()
    wrapper.find(testid('deleteTrigger')).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('change')[0][0]).toMatchObject({
      deletedAt: expect.any(Number)
    })
  })
})
