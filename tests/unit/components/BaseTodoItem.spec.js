import BaseTodoItem from '@/components/BaseTodoItem'
import { mount } from '@vue/test-utils'
import { notDeletedItem, completedItem } from '../data/ToDoFactory'

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

  const wrapper = mount(BaseTodoItem, config)

  return {
    config,
    wrapper
  }
}

describe('BaseTodoItem', () => {
  it('renders the BaseTodoItem', () => {
    const { wrapper, config } = createWrapper()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.text()).toContain(config.propsData.item.content)
  })

  it('sets the completed class if completed', () => {
    const item = completedItem()
    const { wrapper } = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.classes()).toContain('BaseTodoItem--completed')
  })

  it('displays a disabled checkbox in the "checkbox" slot by default', () => {
    const item = completedItem()
    const { wrapper } = createWrapper({
      propsData: {
        item
      }
    })
    const checkbox = wrapper.find('input')
    expect(checkbox.exists()).toBeTruthy()
    expect(checkbox.attributes('disabled')).toBeTruthy()
    expect(checkbox.element.checked).toBe(true)
  })

  it('allows replacing the default checkbox', () => {
    const { wrapper } = createWrapper({
      propsData: {
        item: notDeletedItem()
      },
      slots: {
        checkbox: '<div class="someDiv"/>'
      }
    })
    expect(wrapper.find('.someDiv').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('allows replacing the content slot', () => {
    const { wrapper } = createWrapper({
      propsData: {
        item: notDeletedItem()
      },
      slots: {
        content: '<div class="someContent"/>'
      }
    })
    expect(wrapper.find('.someContent').exists()).toBe(true)
  })
})
