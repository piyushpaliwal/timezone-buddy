import { type MailboxSettings } from '../models/MailboxSettings'

export interface MailBoxSettingsProps {
  idOrUpn: string
}

export const MailboxSettingsForm = (props: {
  model: MailboxSettings
}): JSX.Element => {
  return (
    <p>
      Timezone - {props.model.timezone}
      Time Format - {props.model.timeformat}
      Date Format - {props.model.dateformat}
      Locale - {props?.model.locale.displayName} {props?.model.locale.locale}
    </p>
  )
}
