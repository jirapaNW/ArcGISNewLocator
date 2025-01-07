import { React } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { type IMConfig } from '../config'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  /**
   * ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้เลือก Map Widget
   */
  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds // ผูก useMapWidgetIds กับวิดเจ็ต
      // config: props.config // เก็บการตั้งค่าเดิมไว้
    })
  }

  return (
    <div className="widget-setting">
      <h4>Map Widget Configuration</h4>
      {/* Map Selector */}
      <MapWidgetSelector
        useMapWidgetIds={props.useMapWidgetIds} // ใช้ useMapWidgetIds ที่กำหนดไว้
        onSelect={onMapWidgetSelected} // เรียกใช้เมื่อมีการเปลี่ยนแปลงการเลือก
      />
    </div>
  )
}

export default Setting
