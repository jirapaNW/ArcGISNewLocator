import { type IMThemeVariables, css, type SerializedStyles } from 'jimu-core'
export function getStyle (theme: IMThemeVariables): SerializedStyles {
  const surface = {
    bg: theme.sys.color.surface.paper,
    border: {
      color: theme.sys.color.divider.secondary,
      width: '1px'
    },
    shadow: 'none'
  }
  return css`
    position: relative;
    border: ${surface.border.width} solid ${surface.border.color};

    .bar {
      display: flex;
      background-color: ${surface.bg};

      .btns, dropdowns{
        width: 32px;
        height: 32px;
        border: none;
      }
      .btns {
        margin: 5px;
        border-radius: 0;
        padding: 0;
      }

      .speed-controller{
        margin: 0 8px;
      }

      .progress-bar-wapper {
        /*display: flex;*/
        position: absolute;
        width: 100%;
        bottom: 0px;
      }
      .items {
        display: flex;
        position: relative;
      }
      .items .item {
        display: flex;
        background: ${surface.bg};
      }
      /*.items .btn .jimu-icon{
        margin: 0;
      }*/
      .separator-line{
        width: 2px;
        margin: 4px 1px;
        border-right: ${surface.border.width} solid ${surface.border.color};
      }
      .speed-wapper{
        width: 214px;
      }

      .one-fly-mode { 
        .speed-wapper{
          width: 168px;
        }
      }
    }
    .bar .hide,
    .bar .items.hide {
      display: none;
    }
    `
}

// Toggle speedController
export function getPlayPanelWapperClass (isPlaying: boolean, isOnly1FlyModeInUse: boolean): string {
  let klass = 'hide'
  if (isPlaying) {
    klass = ''
  }

  if (isOnly1FlyModeInUse) {
    klass = klass + ' one-fly-mode'
  }

  return klass
}
export function getSettingBtnsClass (isPlaying: boolean): string {
  let klass = ''
  if (isPlaying) {
    klass = 'hide'
  }
  return klass
}
