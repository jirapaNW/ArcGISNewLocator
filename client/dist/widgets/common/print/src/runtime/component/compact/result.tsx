/** @jsx jsx */
import { React, jsx, css, classNames, hooks, type IMUseUtility } from 'jimu-core'
import { Button, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { PrintResultState, type IMPrintResultListItemTyle } from '../../../config'
import defaultMessage from '../../translations/default'
import { PageOutlined } from 'jimu-icons/outlined/data/page'
import PrintLoading from '../loading-icon'
import { getCredentialToken } from '../../utils/utils'
import { WrongOutlined } from 'jimu-icons/outlined/suggested/wrong'
const { useEffect, useState } = React

interface Props {
  useUtility: IMUseUtility
  prinResult: IMPrintResultListItemTyle
  restPrint: () => void
}

const Result = (props: Props) => {
  const nls = hooks.useTranslation(defaultMessage, jimuiDefaultMessage)

  const { prinResult, useUtility, restPrint } = props
  const [credentialToken, setCredentialToken] = useState(null)

  const STYLE = css`
    .error-link, .error-link:hover {
      color: var(--ref-palette-neutral-1200);
      & svg {
        color: var(--sys-color-error-dark);
      }
    }
  `

  useEffect(() => {
    getCredentialToken(useUtility).then(token => {
      setCredentialToken(token)
    })
  }, [useUtility])

  const renderResultItemIcon = () => {
    switch (prinResult?.state) {
      case PrintResultState.Loading:
        return <PrintLoading/>
      case PrintResultState.Success:
        return (<PageOutlined/>)
      case PrintResultState.Error:
        return (<span title={nls('uploadImageError')}><WrongOutlined /></span>)
    }
  }

  return (
    <div className='d-flex flex-column h-100 w-100 result-con' css={STYLE}>
      <Button
        href={credentialToken ? `${prinResult?.url}?token=${credentialToken}` : prinResult?.url}
        disabled={!prinResult?.url}
        target='_blank'
        size='sm'
        aria-label={prinResult?.title}
        title={prinResult?.title}
        type='tertiary'
        className={classNames('d-flex align-items-center', { 'error-link': prinResult?.state === PrintResultState.Error })}
      >
        {renderResultItemIcon()}
        <div className='ml-2'>{prinResult?.title}</div>
      </Button>
      <div className='flex-grow-1 d-flex align-items-end'>
        <div className='flex-grow-1'></div>
        <Button type='primary' onClick={restPrint}>{nls('reset')}</Button>
      </div>
    </div>
  )
}

export default Result
