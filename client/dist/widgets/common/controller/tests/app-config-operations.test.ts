import { Immutable, LayoutItemType, LayoutParentType, LayoutType } from 'jimu-core'
import { BaseLayoutService, LayoutServiceProvider } from 'jimu-for-builder'
import AppConfigOperations from '../src/tools/app-config-operations'
import { addExistedWidgetToLayout } from '../src/runtime/builder/utils'

const ext = new AppConfigOperations()
ext.widgetId = 'w1'

describe('app config operations test', () => {
  it('controller widget with auto open config', () => {
    let appConfig: any = Immutable({
      widgets: {
        w1: {
          id: 'w1',
          label: 'W1',
          manifest: { name: 'controller', properties: { hasEmbeddedLayout: true } },
          layouts: {
            controller: {
              LARGE: 'l1'
            }
          },
          config: {
            behavior: {
              openStarts: ['w2', 'w3']
            }
          }
        },
        w2: { manifest: { properties: {} } },
        w3: { manifest: { properties: {} } }
      },
      layouts: {
        l1: {
          id: 'l1',
          order: ['0', '1'],
          content: {
            0: {
              type: 'WIDGET',
              widgetId: 'w2'
            },
            1: {
              type: 'WIDGET',
              widgetId: 'w3'
            }
          }
        }
      }
    })

    const copiedWidget = {
      id: 'w4',
      label: 'W4',
      manifest: { name: 'controller', properties: { hasEmbeddedLayout: true } },
      layouts: {
        controller: {
          LARGE: 'l2'
        }
      },
      config: {
        behavior: {
          openStarts: ['w2', 'w3']
        }
      }
    }

    const l2 = {
      id: 'l2',
      order: ['0', '1'],
      content: {
        0: {
          type: 'WIDGET',
          widgetId: 'w5'
        },
        1: {
          type: 'WIDGET',
          widgetId: 'w6'
        }
      }
    }
    appConfig = appConfig
      .setIn(['layouts', 'l2'], l2)
      .setIn(['widgets', 'w4'], copiedWidget)
      .setIn(['widgets', 'w5'], { manifest: { properties: {} } })
      .setIn(['widgets', 'w6'], { manifest: { properties: {} } })

    appConfig = ext.afterWidgetCopied('w1', appConfig, 'w4', appConfig)
    const w4 = appConfig.widgets.w4
    expect(w4.config.behavior.openStarts).toEqual(['w5', 'w6'])
  })
})

class DefaultLayoutService extends BaseLayoutService {
  processAfterItemAdded (appConfig) {
    return appConfig
  }

  getToolItems () {
    return []
  }
}

const service = new DefaultLayoutService()
LayoutServiceProvider.getInstance().registerService(LayoutType.FixedLayout, service)

describe('add existed widget to layout', () => {
  it('should work to add existed widget to layout', async () => {
    const appConfig: any = Immutable({
      widgets: {
        w1: {
          id: 'w1',
          layouts: {
            controller: {
              LARGE: 'controller_layout_large',
              SMALL: 'controller_layout_small'
            }
          },
          manifest: {
            properties: {
              passDataSourceToChildren: true
            }
          }
        },
        w2: {
          id: 'w2',
          parent: {
            LARGE: [{ layoutId: 'controller_layout_large', layoutItemId: '0' }]
          }
        }
      },
      layouts: {
        controller_layout_large: {
          id: 'controller_layout_large',
          type: 'FIXED',
          content: {
            0: {
              type: 'WIDGET',
              widgetId: 'w2'
            }
          },
          parent: { type: LayoutParentType.Widget, id: 'w1' }
        },
        controller_layout_small: {
          id: 'controller_layout_small',
          type: 'FIXED',
          content: {},
          parent: { type: LayoutParentType.Widget, id: 'w1' }
        }
      }
    })

    const { updatedAppConfig, layoutItemId } = addExistedWidgetToLayout(appConfig, 'controller_layout_small', 'w2')
    const layoutItem = updatedAppConfig.layouts.controller_layout_small.content[layoutItemId]

    // layout item created
    expect(layoutItem.id).toBe(layoutItemId)
    expect(layoutItem.type).toBe(LayoutItemType.Widget)
    expect(layoutItem.widgetId).toBeDefined()

    // widget parent add small
    const widgetId = layoutItem.widgetId
    const widgetJson = updatedAppConfig.widgets[widgetId]
    expect(widgetJson.parent.SMALL[0]).toEqual({ layoutId: 'controller_layout_small', layoutItemId })
    expect(widgetJson.parent.SMALL.length).toBe(1)
  })
})
