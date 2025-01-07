/** @jsx jsx */
import { React, jsx, type ThemeButtonType, type IntlShape, css, type IMThemeVariables, type SerializedStyles, classNames, polished, type WidgetInitResizeCallback, type WidgetInitDragCallback } from 'jimu-core'
import { getBuilderThemeVariables } from 'jimu-theme'
import { Link } from 'jimu-ui'
import { QuickStylePopper, type QuickStylePopperProps } from 'jimu-ui/advanced/setting-components'
import defaultMessages from '../translations/default'

interface OwnProps extends Omit<QuickStylePopperProps, 'onChange'> {
  onChange: (t: ThemeButtonType) => void
  selectedType: ThemeButtonType
  onInitResizeHandler?: WidgetInitResizeCallback
  onInitDragHandler?: WidgetInitDragCallback
  theme?: IMThemeVariables
  usePopper?: boolean
}

interface ExtraProps {
  intl: IntlShape
}

export class _QuickStyle extends React.PureComponent<OwnProps & ExtraProps, unknown> {
  THEMETYPES: ThemeButtonType[] = [
    'default',
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'link'
  ]

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  translate = (id: string) => {
    const { intl } = this.props
    return intl ? intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : ''
  }

  getStyle = (theme: IMThemeVariables, usePopper?: boolean): SerializedStyles => {
    return css`
      ${usePopper &&
        `width: ${polished.rem(360)};
        background-color: ${theme.ref.palette.neutral[400]};
        color: ${theme.ref.palette.neutral[1200]};
        border: 1px solid ${theme.ref.palette.neutral[500]};
        box-shadow: 0 4px 20px 4px ${polished.rgba(theme.ref.palette.white, 0.5)};`
      }
      .button-item{
        width: 100%;
        font-size: ${polished.rem(13)};
      }
      .quick-style-item-container{
        padding-left: 4px;
        padding-right: 4px;
        padding-bottom: 8px;
      }
      .quick-style-item{
        border: 2px solid transparent;
        &.quick-style-item-selected{
          border: 2px solid ${theme.sys.color.primary.main};
        }
        .quick-style-item-inner{
          ${usePopper && `background-color: ${theme.ref.palette.neutral[500]};`}
          cursor: pointer;
        }
      }
    `
  }

  render () {
    const { usePopper } = this.props
    return usePopper
      ? (
          <QuickStylePopper reference={this.props.reference} open={true} placement="right-start"
            css={this.getStyle(this.props.theme || getBuilderThemeVariables(), usePopper)} onClose={this.props.onClose}
            onInitDragHandler={this.props.onInitDragHandler} onInitResizeHandler={this.props.onInitResizeHandler}
            trapFocus={false} autoFocus={false}>
            <div className="container-fluid mb-2">
              <div className="row no-gutters">
                {
                  this.THEMETYPES.map((t, i) =>
                    <div key={i} className="col-4 quick-style-item-container">
                      <div className={classNames('quick-style-item', { 'quick-style-item-selected': this.props.selectedType === t })}>
                        <div className="quick-style-item-inner p-2" onClick={() => { this.props.onChange(t) }}>
                          <Link title={this.translate('_widgetLabel')}
                            role="button"
                            className="d-inline-block button-item text-truncate" type={t}
                          >
                            {this.translate('_widgetLabel')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </QuickStylePopper>
        )
      : (
          <div className="container-fluid mb-2" css={this.getStyle(this.props.theme || getBuilderThemeVariables(), usePopper)}>
            <div className="row no-gutters">
              {
                this.THEMETYPES.map((t, i) =>
                  <div key={i} className="col-4 quick-style-item-container">
                    <div className={classNames('quick-style-item', { 'quick-style-item-selected': this.props.selectedType === t })}>
                      <div className="quick-style-item-inner p-2" onClick={() => { this.props.onChange(t) }}>
                        <Link title={this.translate('variableButton')}
                          role="button"
                          className="d-inline-block button-item text-truncate" type={t}
                        >
                          {this.translate('variableButton')}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        )
  }
}

export const QuickStyle = _QuickStyle
